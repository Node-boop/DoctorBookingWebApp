import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    SHA:{
        type:Number,
        unique:true,
        required:false
    },
    ID:{
        type:Number,
        unique:true,
        required:true
    },
    avator:{
        type:Array,
        required:false
    },
    DOB:{
        type:Number,
        required:true,
    }
})

const userProfile = mongoose.models.userProfile || mongoose.model('userProfile',userProfileSchema)

export default userProfile