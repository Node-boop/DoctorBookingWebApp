import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema({
    userID:{
        type:String,
        unique:true,
        
    },
    title:{
        type:String,
        
    },
    phone:{
        type:Number,
        
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
        
    },
    image:{
        type:Array,
        
    },
    DOB:{
        type:Number,
        
    },
    Bio:{
        typre:String,
        
    },
    specialty:{
        type:String,
        
    },
    qualifications:{
        type:String,
        
    },
    experience:{
        type:Number,
        
    },
    clinicAddress:{
        type:Array,
        
    },

})

const doctorProfile = mongoose.models.doctorProfile || mongoose.model('doctorProfile',doctorProfileSchema)

export default doctorProfile