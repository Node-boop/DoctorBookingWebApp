import { request, response, Router } from "express";
import {body,checkSchema,validationResult,matchedData} from 'express-validator'
import { registerValidator } from "../validators/validator.mjs";
import { loginValidator ,doctorProfileValidator} from "../validators/validator.mjs";
import User from "../models/users.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import doctorMiddleware from "../middleware/doctorMiddleware.mjs";
import {v2 as cloudinary} from 'cloudinary'
import doctorProfile from "../models/doctorProfile.mjs";
import upload from "../middleware/multer.mjs";
const router = Router()


export const generateJwtToken = (payload)=>{

    const token = jwt.sign({payload},process.env.JWT_SECRET_KEY)

    return token

}
/**************START OF AUTHENTICATION ROUTES**************/

// creating a new user 
router.post('/api/user/register',body(),checkSchema(registerValidator),async(request,response)=>{
    try {
        const {name,email,phone,password,password2} = request.body // access your values from the request body

        const result = validationResult(request) // use validator to catch any validation errors from your schema

        if(!result.isEmpty())
        {
            return response.status(400).json({succes:false,error:result.array()}) // send response back to the user 
        }

        const user = await User.findOne({email}) // check whether user exists in the database and and throw an error 
        if(user)
        {
            return response.status(409).json({succes:false,message:"User already exists"})
        }
        if(password !== password2) // compare passwords after thay are sent and return a response
        {
            return response.status(409).json({succes:false,message:"Passwords do not match"})
        }

        const salt = bcrypt.genSaltSync(10) // Generate dalt rounds to hash the password

        const hashedPassword = bcrypt.hashSync(password,salt) // hashing the password from the salt created

        const data = matchedData(request) // accessing the validated data from our express-validator and create a user from the data
        
        data.password = hashedPassword
        console.log(data)
        const newUser = new User({
            name:data.name,
            email:data.email,
            phone:`${data.phone}`,
            role:'patient',
            password:data.password
        })
        await newUser.save()
        /**************** a model to return filtered data about a user***************** */
        const responseModel = {
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            phone:newUser.phone,
            role:newUser.role
        }
        response.status(201).json({succes:true,user:responseModel})
    } catch (error) {
        console.log(error)
        return response.status(500).json({succes:false,message:error.message}) // catching errors and diplaying them
    }
    
})


// logging in users and generating authorization JWT token for each user

router.post('/api/user/auth',checkSchema(loginValidator),async(request,response)=>{
    try {
        const result = validationResult(request) // catching all validation error from express-validator

        if(!result.isEmpty())
        {
            return response.status(400).json({succes:false,error:result.array()})
        }
        const {email,password} = request.body // ACCESSING VALUES FROM  THE REQUEST BODY
        const data  = matchedData(request)
        
        console.log(data)
        const user = await User.findOne({email})
        console.log(user)
        
        //QUERYING USER USING THE EMAIL ID TO CHECK WHETHER THEY EXIST OR NOT 
        if(!user)
        {
            return response.status(404).json({succes:false,message:"User not found"})
        }

        // COMPARING PASSWORDS ENTERED AND THE USER PASSWORD IN OUR DATABASE
        const passswordMatch = bcrypt.compare(password,user.password)

        if(!passswordMatch)
        {
            return response.status(409).json({succes:false,message:"Invalid username or password"})
        }

        // CREATING PAYLOAD OBJECT TO GENERATE JWT BEARER TOKEN

        const payload = {
            id:user._id,
            role:user.role
        }

        const token = generateJwtToken(payload)

        return response.status(200).json({succes:true,token:token,type:'Bearer'})

    } catch (error) {
        console.log(error)
        return response.status(500).json({succes:false,errors:error.message})
        
        
    }
})

/*************************END OF AUTHENTICATION ROUTES **************/

// profile creation setup

router.post('/api/user/doctor-profile',doctorMiddleware,checkSchema(doctorProfileValidator),upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'imag4',maxCount:1}]),async(request,response)=>{

    const {title,speciality,DOB,ID,experience,qualifications,licenceNumber,Bio,clinicAddress,phone} = request.body
    const userId = request.user.payload.id
    if(request.user.payload.role !== 'doctor' || request.user.payload.role !== 'admin')
    {
        throw new Error("Action forbidden no permisions to write on this resource")
    }
    const result = validationResult(request)
    if(!result.isEmpty())
    {
        throw new Error('error' + result.array())
    }
    const data = matchedData(request)
    console.log(data)
    
    const user = await User.findById(userId)

    if(!user)
        throw new Error('User not found')


    const image1 = request.files.image1 && request.files.image1[0]
    const image2 = request.files.image2 && request.files.image2[0]
    const image3 = request.files.image3 && request.files.image3[0]
    const image4 = request.files.image4 && request.files.image4[0]

    const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

    const imageUrl = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    )

    const newProfile = new doctorProfile({
        userId,
        title,
        image:imageUrl,
        speciality,
        Bio,
        experience,
        qualifications,
        licenceNumber,
        phone,
        ID,
        DOB,

    })
    
})


export default router