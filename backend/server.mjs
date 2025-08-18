import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import connectMongoDB from './config/mongodb.mjs'
import routes from './routes/index.mjs'
import passport from 'passport'
import connectV2 from './config/cloudinary.mjs'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerSpec from './utils/swagger.mjs'
import OpenAI from 'openai'
import swaggerUi from 'swagger-ui-express'
import session from 'express-session'
import http from 'http'






const app = express()
const server = http.createServer(app)


connectMongoDB()
connectV2()
app.use(cors())
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
   
}))

app.use(routes)


app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))



server.listen(process.env.PORT,()=>{
    console.log(`[+] Server running on port : ${process.env.PORT}`)
})