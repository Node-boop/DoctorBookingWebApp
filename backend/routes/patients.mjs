import { json, request, response, Router } from "express";
import {body,checkSchema,validationResult,matchedData} from 'express-validator'
import { registerValidator } from "../validators/validator.mjs";
import { loginValidator } from "../validators/validator.mjs";
import User from "../models/users.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userProfile from "../models/userProfile.mjs";
import userMiddleware from "../middleware/userMiddleware.mjs";
import { patientProfileValidator } from "../validators/validator.mjs";
import {v2 as cloudinary} from 'cloudinary'
import upload from "../middleware/multer.mjs";


const router = Router()


export const generateJwtToken = (payload)=>{

    const token = jwt.sign({payload},process.env.JWT_SECRET_KEY)

    return token

}
// creating a new user 
router.post('/api/user/register',body(),checkSchema(registerValidator),async(request,response)=>{
    try {
        const {name,email,password,password2} = request.body // access your values from the request body

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

        const salt =await bcrypt.genSalt(10) // Generate dalt rounds to hash the password

        const hashedPassword =await bcrypt.hash(password,salt) // hashing the password from the salt created

        const data = matchedData(request) // accessing the validated data from our express-validator and create a user from the data
        
        data.password = hashedPassword
        console.log(data)
        const newUser = new User({
            name:data.name,
            email:data.email,
           
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


/***Profile setting routes  */

router.post('/api/user/patient-profile',userMiddleware,checkSchema(patientProfileValidator),upload.fields([{name:'avator',maxCount:1}]),async(request,response)=>{

    const {title,SHA,ID,DOB,phone} = request.body
    const userId = request.user.payload.id
    
    const result = validationResult(request)
    if(!result.isEmpty())
    {
        return response.status(400).json({succes:false,error:result.array()})
    }

    const user = await User.findById(userId)

    if(!user)
    {
        throw new Error("User not found")
    }

    const avator = request.files.avator && request.files.avator[0]

    const images = [avator].filter((image)=> image !== undefined)

    const imageUrl = await Promise.all(
        images.map(async(image)=>{
            let response = await cloudinary.uploader.upload(image.path,{resource_type:'image'})
            return response.secure_url
        })
    )
    let dateOfBirth = new Date(DOB)
    const newProfile = new userProfile({
        userId:user._id,
        title,
        SHA,
        ID,
        phone,
        DOB:dateOfBirth,
        avator:imageUrl

    })

    await newProfile.save()

    return response.json({succes:true,user:user,profile:profile})

})


// Password verify patient account


const generateOtp = ()=>{
    const min = 1000000
    const max = 999999

    const otp = Math.floor(Math.random() * (max-min) + min)

    return otp
}

// sending email to the user

const sendVerificationEmail = ()=>{
    
}
router.post('/api/user/account-verify',userMiddleware,async(request,response)=>{
    const userId = request.user.payload.id
    const user = User.findById(userId)

    if(!user)
    {
        return response.status(401),json({succes:false,error:"User not found or unauthenticated"})
    }


})

export default router