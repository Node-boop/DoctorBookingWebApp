import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import connectMongoDB from './config/mongodb.mjs'
import routes from './routes/index.mjs'
import passport from 'passport'
import session from 'express-session'
import connectV2 from './config/cloudinary.mjs'
const app = express()

connectMongoDB()
connectV2()
app.use(cors())
app.use(express.json())

app.use(routes)



app.listen(process.env.PORT,()=>{
    console.log(`[+] Server running on port : ${process.env.PORT}`)
})