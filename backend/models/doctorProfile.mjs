import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    userID:{
        type:String,
        unique:true,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    licenceNumber:{
        type:String,
        unique:true,
        required:false
    },

    ID:{
        type:Number,
        unique:true,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Approved','Inactive','Suspended','Banned'],
        default:'Pending'
    },
    DOB:{
        type:Number,
        required:true,
    },
    Bio:{
        typre:String,
        required:true
    },
    specialty:{
        type:String,
        required:true,
    },
    qualifications:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true
    },
    clinicAddress:{
        type:Array,
        required:true
    },

})

const doctorProfile = mongoose.models.doctorProfile || mongoose.model('doctorProfile',doctorProfileSchema)

export default doctorProfile