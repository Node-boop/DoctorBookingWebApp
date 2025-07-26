import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    patientID:{
        type:String,
    },
    doctorID:{
        type:String
    },
    appointmentDate:{
        type:String,
        required:true
    },
    appointmentTime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','confrimed','cancelled','reschedulled','completed'],
        default:'pending'

    },
    reasonForVisit:{
        type:String,
        required:true

    },
    notes:{
        type:String,
        required:false
    },
    createdAt:{
        type:Number,
        default:new Date
    },
    updatedAt:{
        type:Number,
        default:new Date
    }
})


const booking = mongoose.models.booking || mongoose.model('booking',bookingSchema)

export default booking