import { response, Router } from "express";
import {body,checkSchema,validationResult,matchedData} from 'express-validator'
import { registerValidator } from "../validators/validator.mjs";
import { loginValidator } from "../validators/validator.mjs";
import User from "../models/users.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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



export default router