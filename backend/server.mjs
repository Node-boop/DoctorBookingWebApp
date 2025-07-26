import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import connectMongoDB from './config/mongodb.mjs'
import routes from './routes/index.mjs'
import passport from 'passport'
import session from 'express-session'
import connectV2 from './config/cloudinary.mjs'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerSpec from './utils/swagger.mjs'
import swaggerUi from 'swagger-ui-express'
const app = express()

connectMongoDB()
connectV2()
app.use(cors())
app.use(express.json())

app.use(routes)


app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
console.log(JSON.stringify(swaggerSpec, null, 2)); 

console.log(swaggerSpec)
app.listen(process.env.PORT,()=>{
    console.log(`[+] Server running on port : ${process.env.PORT}`)
})