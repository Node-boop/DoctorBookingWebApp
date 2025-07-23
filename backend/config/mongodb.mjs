import mongoose from 'mongoose'

const connectMongoDB = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log(`[+] Database connected succesfully...`)
    })
    await mongoose.connect(`${process.env.MONGODB}/doctor`)
}

export default connectMongoDB