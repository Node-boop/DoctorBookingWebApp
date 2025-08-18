import { request, response, Router } from "express";
import User from "../models/users.mjs";
import Doctor from "../models/doctor.mjs";
import jwt from 'jsonwebtoken'

const router = Router()



/*
router.post('/api/user/admin/auth',async(request,response)=>{

    const {email,password} = request.body

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD)
        return response.status(403).json({success:false,message:"Invalid email or password"})



    const token = generateAdminToken(process.env.ADMIN_EMAIL,process.env.ADMIN_PASSWORD)

    return response.status(200).json({success:true,token:token,type:'Bearer'})



})
*/



/**
 * @swagger
 * /api/super/list-users:
 *   get: 
 *     summary: Retrieve list of users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListOfUsers'
 * 
 * 
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     
 */
router.get('/api/super/list-users',async(request,response)=>{
    try {
        const users = await User.find({})
        if(!users)
        {
            return response.status(404).json({succes:false,error:"No users retrieved"})
        }

        return response.status(200).json({succes:true,users:users})
    } catch (error) {
        
    }
})

/**
 * @swagger
 * /api/super/list-doctors:
 *   get: 
 *     summary: Retrieve all doctors
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListOfUsers'
 * 
 * 
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     
 */

router.get('/api/super/list-doctors',async(request,response)=>{
    try {
        const users = await Doctor.find({})
        if(!users)
        {
            return response.status(404).json({succes:false,error:"No users retrieved"})
        }

        return response.status(200).json({succes:true,users:users})
    } catch (error) {
        
    }
})
router.post('/api/super/delete/patients',async(request,response)=>{
   try {
     await User.deleteMany({})
     return response.json({success:true,messages:"Database cleared"})
   } catch (error) {
    return response.json({success:false,message:error.message})
    
   }
    
})

export default router