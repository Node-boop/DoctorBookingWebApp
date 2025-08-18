import { request, response, Router } from "express";
import {body,checkSchema,validationResult,matchedData} from 'express-validator'
import { registerValidator } from "../validators/validator.mjs";
import { loginValidator ,doctorProfileValidator} from "../validators/validator.mjs";
import User from "../models/users.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import doctorMiddleware from "../middleware/doctorMiddleware.mjs";
import {v2 as cloudinary} from 'cloudinary'
import doctorProfile from "../models/doctor.mjs";
import upload from "../middleware/multer.mjs";
import nodemailer from 'nodemailer'
import userMiddleware from "../middleware/userMiddleware.mjs";
import Doctor from "../models/doctor.mjs";
import doctorModel from "../models/doctorModel.mjs";
import doctorSchedule from "../models/doctor-schedules.mjs";
const router = Router()


export const generateJwtToken = (payload)=>{

    const token = jwt.sign({payload},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

    return token

}
/**************START OF AUTHENTICATION ROUTES**************/

// creating a new user with doctor proviledges

/**
 * @swagger
 * /api/user/doctor/register:
 *   post:
 *     summary: User with doctor abilities registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterRequest'
 *     
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorAuthResponse'
 * 
 *       
 *       409:
 *         description: Conflict
 *         content:
 *           applicaion/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationConflictError'
 * 
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse' 
 */


router.post('/api/user/doctor/register',[body()],upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),checkSchema(registerValidator),async(request,response)=>{
    try {
        const {firstName,lastName,email,password,gender

        } = request.body // access your values from the request body

        const result = validationResult(request) // use validator to catch any validation errors from your schema

        if(!result.isEmpty())
        {
            return response.status(400).json({succes:false,error:result.array()}) // send response back to the user 
        }

        const user = await Doctor.findOne({email}) // check whether user exists in the database and and throw an error 
        if(user)
        {
            return response.status(409).json({succes:false,message:"User already exists"})
        }

        const image1 = request.files.image1 && request.files.image1[0]
        const image2 = request.files.image2 && request.files.image2[0]
        const image3 = request.files.image3 && request.files.image3[0]
        const image4 = request.files.image4 && request.files.image4[0]

        const images = [image1,image2,image2,image3,image4].filter((image)=> image !== undefined)

        const imageUrl = await Promise.all(
            images.map(async(image)=>{
                let result = await cloudinary.uploader.upload(image.path,{resource_type:'image'})
                return result.secure_url
            })
        )
       
        const salt = bcrypt.genSaltSync(10) // Generate dalt rounds to hash the password

        const hashedPassword = bcrypt.hashSync(password,salt) // hashing the password from the salt created

        const data = matchedData(request) // accessing the validated data from our express-validator and create a user from the data
        
        data.password = hashedPassword
        console.log(data)
        const newUser = new Doctor({
            firstName:data.firstName,
            lastName:data.lastName,
            email:data.email,
            gender:data.gender,
            role:'doctor',
            password:data.password,
            image:imageUrl
        })
        newUser.status = 'Pending'
        await newUser.save()
        /**************** a model to return filtered data about a user***************** */
        const responseModel = {
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            gender:newUser.gender,
            role:newUser.role
        }
        response.status(201).json({succes:true,user:responseModel})
    } catch (error) {
        console.log(error)
        return response.status(500).json({succes:false,message:error.message}) // catching errors and diplaying them
    }
    
})


// logging in users and generating authorization JWT token for each user

/**
 * @swagger
 * /api/user/doctor/auth:
 *   post:
 *     summary: Authenticate a doctor
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginRequest'
 *     responses:
 *       200:
 *         description: Login Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Login Failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginError'
 */
router.post('/api/user/doctor/auth',checkSchema(loginValidator),async(request,response)=>{
    try {
        const result = validationResult(request) // catching all validation error from express-validator

        if(!result.isEmpty())
        {
            return response.status(400).json({succes:false,error:result.array()})
        }
        const {email,password} = request.body // ACCESSING VALUES FROM  THE REQUEST BODY
        const data  = matchedData(request)
        
        console.log(data)
        const user = await Doctor.findOne({email})
        console.log(user)
        
        //QUERYING USER USING THE EMAIL ID TO CHECK WHETHER THEY EXIST OR NOT 
        if(!user)
        {
            return response.status(404).json({succes:false,message:"User not found"})
        }
        if(user.role !== 'doctor')
            return response.status(403).json({succes:false,message:"Only doctors can log in from this endpoint"})
        

        // COMPARING PASSWORDS ENTERED AND THE USER PASSWORD IN OUR DATABASE
        const passswordMatch = bcrypt.compare(password,user.password)

        if(!passswordMatch)
        {
            return response.status(409).json({succes:false,message:"Invalid email or password"})
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

/**
 * @swagger
 * /api/user/doctor/profile:
 *   post:
 *     summary: Doctor Profile creation
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DoctorProfile'
 * 
 *     responses:
 *       201:
 *         description: Profile Created!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorProfileResponse'
 *       500:
 *         description: Request Failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorProfileError'
 */
router.post('/api/user/doctor/profile',doctorMiddleware,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'imag4',maxCount:1},{name:'image5',maxCount:1},{name:'profile',maxCount:1},{name:'license',maxCount:1}]),async(request,response)=>{

    const {
        dateOfBirth,nationality,nationalIdNumber,
            kraPin,phoneNumber,address,kmpdulicenseNumber,registrationDate,registrationStatus,isLicenseActive,licenseExpiry,educaationBackground,
            internshipDetails,Bio,workExperience
    } = request.body
    const userId = request.user.payload.id
    if(request.user.payload.role !== 'doctor' || request.user.payload.role !== 'admin')
    {
        throw new Error("Action forbidden no permisions to write on this resource")
    }
    const result = validationResult(request)
    if(!result.isEmpty())
    {
        return response.json({success:false,error:result.array()})
    }
    const data = matchedData(request)
    console.log(data)
    
    const user = await Doctor.findById(userId)

    if(!user)
        return response.json({success:false,message:"Seems you not logged in"})

    const profile = request.files.profile && request.files.profile[0]

    const profiles = [profile].filter((item)=> item !== undefined)

    const profileUrl = await Promise.all(
        profiles.map(async(item)=>{
            let response = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    )

    const license = request.files.license && request.files.license[0]

    if(license === undefined)
    {
        return response.json({success:false,message:"license image id required"})
    }

    const licenceUrl = await Promise.all(async()=>{
        let result = await cloudinary.uploader.upload(license.path,{resource_type:'image'})
        return result.secure_url
    })


    const image1 = request.files.image1 && request.files.image1[0]
    const image2 = request.files.image2 && request.files.image2[0]
    const image3 = request.files.image3 && request.files.image3[0]
    const image4 = request.files.image4 && request.files.image4[0]
    const image5 = request.files.image5 && request.files.image5[0]

    const academicimages = [image1,image2,image3,image4,image5].filter((item)=> item !== undefined)

    const academicUrls = await Promise.all(
        academicimages.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    ) 




    

    const idFront = request.files.idFront && request.files.idFront[0]
    const idBack = request.files.idBack && request.files.idBack[0]
    const idImages = [idBack,idFront].filter((item)=> item !== undefined)

    const idImageUrl = await Promise.all(
        idImages.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    )

    const newProfile = new doctorModel({
        userId,
        phoneNumber,
        nationalIdNumber,
        nationality,
        profilePiture:profileUrl,
        dateOfBirth,
        kraPin,
        kmpdulicenseNumber,
        registrationDate,
        registrationStatus,
        licenseExpiry,
        indentificationDocuments:idImageUrl,
        licenseImage:licenceUrl,
        academicDocuments:academicUrls,
        educaationBackground,
        internshipDetails,
        Bio,
        workExperience


    })

    await newProfile.save()
    return response.json({success:true, userProfile:newProfile})
    
})


router.post('/api/doctors/search',async(request,response)=>{
   try {
    const query = request.query.query
    // query and match multiple fileds of the search
    const queryResult = Doctor.find({
        $or:[
            {firstName:{$regex: query, $options:'i'}},
            {lastName: {$regex: query, $options: 'i'}}
        ]
    })

    console.log(queryResult)

    return response.json({success:true,results:queryResult})

   } catch (error) {
        console.log(error.message)
        return response.json({success:false,message:error.message})
    
   }


})



router.post('/api/user/doctor/verify',userMiddleware,async(request,response)=>{
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
// doctor route to create slots for booking

router.post('/api/user/doctor/add-slot',
    [body("slots")
        .isArray()
        .withMessage("Slot field must be of type array"),
        
    
    body('duration')
    .isNumeric()
    .withMessage("Duration must be a valid integer type")
    ]
    ,doctorMiddleware,async(request,response)=>{
    try {
        
        const result = validationResult(request)

        if(!result.isEmpty())
            return response.json({succes:false,error:result.array()})
        const doctorID = request.user.payload.id
        const doctor = await User.findById(doctorID)
        const {slots,duration} = request.body
        if(!doctor)
            return response.status(404).json({succes:false,message:'User not found'})

        if(doctor.role !== 'doctor')
            return response.status(403).json({succes:false,message:'No permissions to access this resource'})

        const newSchedule = new doctorSchedule({
            doctorID,
            availableSlots:slots,
            slotDuration:duration
        })
        await newSchedule.save()

        return response.status(201).json({succes:true,schedule:newSchedule})
        
    } catch (error) {
        console.log(error)
    }
})


export default router