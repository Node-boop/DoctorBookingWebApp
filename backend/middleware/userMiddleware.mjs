import { request, response } from 'express'
import jwt from 'jsonwebtoken'


const userMiddleware  = async(request,response,next)=>{
    const authorizationHeader = request.headers.authorization
    console.log(request.headers)
    if(!authorizationHeader)
    {
        return response.status(400).json({succes:false,errorMessage:"Authorization Header required"})
    }

    const token = authorizationHeader.split(' ')[1]

    if(!token)
    {
        return response.status(400).json({succes:false,errorMessage:"JWT Bearer token missing in the request"})
    }

    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

        request.user = decoded

        next()
    } catch (error) {

        return response.status(400).json({succes:false,errorMessage:"JWT Bearer provided is invalid or Expired"})
    }
}

export default userMiddleware