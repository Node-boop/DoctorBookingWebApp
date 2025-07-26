import { request, response } from 'express'
import jwt, { decode } from 'jsonwebtoken'

const adminMiddlware = async(request,response,next)=>{
    const authHeader = request.headers.authorization

    if(!authHeader)
        return response.status(400).json({succes:false,errorMessage:"Authorization Header required"})

    const token = authHeader.split(' ')[1]

    if(!token)
    {
        return response.status(400).json({succes:false,errorMessage:"JWT Bearer token missing in the request"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

        if (decoded === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
        {
            request.user = decoded
            next()
        }
        else{
            return response.status(403).json({succes:false,errorMessage:"Not Autorized"})

        }

    } catch (error) {
        return response.status(400).json({succes:false,errorMessage:"Invalid or exprired token"})
        
    }
}

export default adminMiddlware