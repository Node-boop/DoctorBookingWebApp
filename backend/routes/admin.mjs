import { response, Router } from "express";
import User from "../models/users.mjs";


const router = Router()

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