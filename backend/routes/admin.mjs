import { response, Router } from "express";
import User from "../models/users.mjs";


const router = Router()



/**
 * @swagger
 * /api/super/list-users
 * get:
 * summary:Retrieve list of users
 * tags:
 * - Users
 * responses:
 * 200:
 * description: A list of users
 * content:application/json
 * schema:
 * type:array
 * items:
 * type:object
 * properties:
 * _id:
 * type:Hex
 * description:the user ID
 * example:1
 * name:
 * type:string
 * description:The users name
 * example:John Doe
 * 500:
 * description: Server error
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