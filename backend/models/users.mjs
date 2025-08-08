import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
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
        
    },
    role:{
        type:String,
        enum:['patient','doctor','admin'],
        default:'user'
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
    },
    cartData:{
        type:Array,
        default:[]
    },
    wishList:{
        type:Array,
        default:[]
    },
    



})

const User  = mongoose.models.user || mongoose.model('user',userSchema)

export default User