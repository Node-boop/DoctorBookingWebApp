import mongoose from "mongoose";



const doctorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,

    },
    lastName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        

    },
    password:{
        type:String,
        reqruied:true,
        select:false
    },
    role:{
        type:String,
        enum:['patient','doctor','admin'],
        default:'doctor'
    },
    gender:{
        type:String,
        enum:['Male','Femal','Other'],
        required:true,
    },
    image:{
        type:Array,
        required:true
    },
    passwordResetToken:{
        type:String
    },
    passwordResetExpires:{
        type:Date,
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:['Pending','Approved','Inactive','Suspended','Banned'],
        default:'Pending'
    },
    loginAttempts:{
        type:Number,
        default:0
    },
    lastLoginAttempt:{
        type:Number,
        default:new Date
    },
    lastLogin:{
        type:Number,
        default:new Date
    },
    joined:{
        type:Number,
        default:new Date
    },
    updatedAt:{
        type:Number,
        default:new Date
    }
    



})

const Doctor  = mongoose.models.doctor || mongoose.model('doctor',doctorSchema)

export default Doctor