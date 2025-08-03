import { request, response } from 'express'
import jwt from 'jsonwebtoken'


const userMiddleware  = async(request,response,next)=>{
    const authorizationHeader = request.headers.authorization
    
   
    if(!authorizationHeader)
    {
        return response.status(401).json({succes:false,errorMessage:"Not Authenticated Please Login"})
    }

    const token = authorizationHeader.split(' ')[1]

    if(!token)
    {
        return response.json({succes:false,errorMessage:"JWT Bearer token missing in the request"})
    }

    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

        request.user = decoded

        next()
    } catch (error) {

        return response.json({succes:false,errorMessage:"JWT Bearer provided is invalid or Expired"})
    }
}

export default userMiddleware