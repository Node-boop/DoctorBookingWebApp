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
import nodemailer from 'nodemailer'
import doctorSchedule from "../models/doctor-schedules.mjs";
import booking from '../models/booking.mjs'
import '../strategies/google-Oath20-strategy.mjs'
import passport from "passport";
const router = Router()


export const generateJwtToken = (payload)=>{

    const token = jwt.sign({payload},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

    return token

}
// creating a new user 
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Add new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterRequest'
 * 
 * 
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *      
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationConflictError'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/componets/schemas/ErrorResponse'         
 *       
 *       
 */

router.post('/api/user/register',body(),checkSchema(registerValidator),async(request,response)=>{
    try {
        const {firstName,lastName,email,gender,password} = request.body // access your values from the request body

        const result = validationResult(request) // use validator to catch any validation errors from your schema

        if(!result.isEmpty())
        {
            return response.json({succes:false,error:result.array()}) // send response back to the user 
        }

        const user = await User.findOne({email}) // check whether user exists in the database and and throw an error 
        if(user)
        {
            return response.status(409).json({succes:false,message:"User already exists"})
        }
        /*
        if(password !== password2) // compare passwords after thay are sent and return a response
        {
            return response.status(409).json({succes:false,message:"Passwords do not match"})
        }
        */

        const salt =await bcrypt.genSalt(10) // Generate dalt rounds to hash the password

        const hashedPassword =await bcrypt.hash(password,salt) // hashing the password from the salt created

        const data = matchedData(request) // accessing the validated data from our express-validator and create a user from the data
        
        data.password = hashedPassword
        console.log(data)
        const newUser = new User({
            firstName:data.firstName,
            lastName:data.lastName,
            email:data.email,
            gender:gender,
           
            role:'patient',
            password:data.password
        })
        newUser.status = 'Approved'
        await newUser.save()
        /**************** a model to return filtered data about a user***************** */
        const responseModel = {
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            phone:newUser.phone,
            role:newUser.role
        }
        const payload = {
            id:newUser._id,
            role:newUser.role
        }

        const token = generateJwtToken(payload)
        response.json({success:true,user:responseModel,message:"User created!",token:token})
    } catch (error) {
        console.log(error)
        return response.status(500).json({succes:false,message:error.message}) // catching errors and diplaying them
    }
    
})

// logging in users and generating authorization JWT token for each user

/**
 * @swagger
 * /api/user/auth:
 *   post:
 *     summary: Login User
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginRequest'
 *     
 *     responses:
 *       200:
 *         description: Login Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: User not Found or Invalid credentials
 *         content:
 *           application/json:
 *             schemas:
 *               $ref: '#/components/schemas/LoginError'
 *     
 */
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
        const user = await User.findOne({email:data.email})
        //console.log(user)
        
        //QUERYING USER USING THE EMAIL ID TO CHECK WHETHER THEY EXIST OR NOT 
        if(!user)
        {
            return response.json({success:false,message:"User not found"})
        }

        if(user.role !== 'patient')
        {
            return response.json({success:false,message:"Invalid login please create a patient account to login"})
        }

        // COMPARING PASSWORDS ENTERED AND THE USER PASSWORD IN OUR DATABASE
        const passswordMatch = await bcrypt.compare(password,user.password)

        if(!passswordMatch)
        {
            return response.json({success:false,message:"Invalid username or password"})
        }

        // CREATING PAYLOAD OBJECT TO GENERATE JWT BEARER TOKEN

        const payload = {
            id:user._id,
            role:user.role
        }


        const token = generateJwtToken(payload)

        return response.json({success:true,token:token,type:'Bearer'})

    } catch (error) {
        console.log(error)
        return response.status(500).json({succes:false,errors:error.message})
        
        
    }
})


// google-Oauth20 authentication routes


router.get('/api/oauth2/google',passport.authenticate('google',{scope:['profile']}))
router.get('/api/google/callback',passport.authenticate('google',{failureMessage:'Error something went wrong'}),async(request,response)=>{
    response.send("Failed")
})

/***Profile setting routes  */

router.post('/api/user/patient-profile',userMiddleware,upload.fields([{name:'avator',maxCount:1}]),async(request,response)=>{

    const {contact,address,nextOfKin,title,medicalInformation,identification,insuranceInformation,} = request.body // getting user input from the requestbody
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

    const image1 = request.files.image1 && request.files.image1[0]
    const image2 = request.files.image2 && request.files.image2[0]

    const idImaged = [image1,image2].filter((item)=> item !== undefined)

    const kraImg = request.files.kraImg && request.files.kraImg[0]

    const kraImageUrl = await Promise.all(
        async()=>{
            let url = await cloudinary.uploader.upload(kraImg.path,{resource_type:'image'})
            return url.secure_url;

        }
    ) 

    const imageUrl = await Promise.all(
        images.map(async(image)=>{
            let response = await cloudinary.uploader.upload(image.path,{resource_type:'image'})
            return response.secure_url
        })
    )
    let dateOfBirth = new Date(DOB)
    identification.Image = imageUrl;
    identification.kraImage = kraImageUrl
    
    const newProfile = new userProfile({
        userId:user._id,
        title,
        contact,
        address,
        medicalInformation,
        identification,
        insuranceInformation,
        nextOfKin,
        profilePhoto:imageUrl

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

const sendVerificationEmail = (to,from)=>{

    try {
        // creating transporter to connect to smtp server 
        const otp  = generateOtp()
        const transpoter = nodemailer.createTransport({
            host:'smtp.google.email',
            port:'465',
            secure:true,
            auth:{
                user:'',
                pass:''
            }
        })

        let subject = 'Account verification request'
        const html = `<p>Hello Welcome to Meddicure,you are receiving this email </b>because you or somebody else requested a verification code to 
        verify your account if this was not you please ignore this email</b> <strong> Your verification code is:</b><h1>${otp}</h1></strong></p>`
        

    
    } catch (error) {
        
    }

    
}
/**
 * @swagger
 * /api/user/account-verify:
 *   post:
 *     summary: Verify user account using OTP(One-Time-Password)
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAccountVerification'
 *     
 *     responses:
 *       200:
 *         description: Account verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerificationResponse'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerificationError'       
 *               
 */


router.post('/api/user/send-verification-email',userMiddleware,async(request,response)=>{
   try {
    const userId = request.user.payload.id
    const user = User.findById(userId)

    if(!user)
    {
        return response.status(401),json({succes:false,error:"User not found or unauthenticated"})
    }
    // generating OTP from the function above
    const otp  = generateOtp()

    const adminEmail = ''; // your personnalised email from your provider to send emails
    const adminPass = '' // you given password to connect to external apps

    // creating a transporter agent to send email
    const transpoter = nodemailer.createTransport({
        host:'smtp.google.email',
        port:'465',
        secure:true,
        auth:{
            user:adminEmail,
            pass:adminPass
        }
    })

    let subject = 'Account verification request'
    const html = `<p>Hello Welcome to Meddicure,you are receiving this email </b>because you or somebody else requested a verification code to 
    verify your account if this was not you please ignore this email</b> <strong> Your verification code is:</b><h1>${otp}</h1></strong></p>`
        
    const verficationMail = transpoter.sendMail({
        to:user.email,
        from:adminEmail,
        subject:subject,
        html:html
    })

    response.status(200).json({succes:true,message:'a verification has been sent to your email'})
   } catch (error) {
    response.json({succes:false,message:error.message})

   }


})

// ROUTES TO ENABLE APPOINTMENTS

/**
 * @swagger
 * /api/user/appointment-booking:
 *   post:
 *     summary: Patient Appointment Placing
 *     tags: [Appointment Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingModel'
 *     responses:
 *       201:
 *         description: Appointment Placed 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingResponse'
 *       500:
 *         description: Failed to process request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingError'
 */


router.post('/api/user/appointment-booking',[body('userSlot').isObject().withMessage("Field must be a valid object"),
    body('doctorID').isString().withMessage('Field must be of data type string'),
    body('reason').isString().withMessage("reason field must be a valid data type of string")
],userMiddleware,async(request,response)=>{
    try {

        const {doctorID,userSlot,reason} = request.body
        const ID = request.query
        console.log(ID)
       
        // exracting results from validator
        const result = validationResult(request)
        // checking for validation errors from react validater
        if(!result.isEmpty())
            return response.json({succes:false,error:result.array()})
        const userID = request.user.payload.id
        
        const user = await User.findById(userID)
      
        

        if(!user)
        {
            return response.status(401).json({succes:false,message:"Failed user not found or Unauthenticated"})
        }
        

        const schedule = await doctorSchedule.findOne({doctorID})

        if(!schedule)
            throw new Error('Cannot find schedule for the doctor')

        const availableSlots = schedule.availableSlots

        if(!availableSlots)
            throw new Error('No Slots availble for selection')

        //looping through all slots
        console.warn(availableSlots)
        /*
        for(const slot in availableSlots)
        {
            if(!slot)
            {
                throw new Error("No Slot found")
            }
            if (slot.time === userSlot.time && slot.date === userSlot.date && slot.isBooked === false)
            {
                console.log(slot)
                 console.log(slot.date)
                const newBooking = new booking({
                    patientID:userID,
                    doctorID,
                    appointmentDate:slot.date,
                    appointmentTime:slot.time

                })

                await newBooking.save()
                slot.isBooked = true
                await slot.save()
                return response.status(201).json({succes:true,Booking:newBooking})
                
            }else{
                return response.status(404).json({succes:false,message:"Slot not availble or is booked"})
            }
        }*/
        
        const slot = availableSlots.find((item)=> item.date === userSlot.date && item.time === userSlot.time )
        if(!slot)
            throw new Error("The slot is not available")
        
        if(slot.isBooked)
            throw new Error("Slot Booked kindly consider rescheduling")

        const newBooking = new booking({
                    patientID:userID,
                    doctorID,
                    appointmentDate:slot.date,
                    appointmentTime:slot.time,
                    reasonForVisit:reason

                })

        await newBooking.save()
        slot.isBooked = true

        return response.status(201).json({succes:true,Booking:newBooking})
    } catch (error) {
        console.log(error)
        response.json({succes:false,error:error.message})
        
    }
})

router.get('/api/users/profile',userMiddleware,async(request,response)=>{
    try {
        const userID = request.user.payload.id

        const user = await User.findById(userID)

        if(!user)
            return response.json({success:false,message:"Not Authenticated"})

        return response.json({success:true,user:user})
    } catch (error) {
        return response.json({success:false,message:error.message})
        
    }



})

export default router