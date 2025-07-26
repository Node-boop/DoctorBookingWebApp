import { response, Router } from "express";
import User from "../models/users.mjs";


const router = Router()



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

export default router