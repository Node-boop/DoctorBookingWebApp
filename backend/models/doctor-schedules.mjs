import mongoose from "mongoose";

const doctorSheduleSchema = new mongoose.Schema({
    doctorID:{
        type:String,
        required:true,
    },
    availableSlots:{
        type:Array,
        required:true,

    },
    slotDuration:{
        type:Number,
        default:60,
        required:true,
    },
    isBooked:{
        type:Boolean,
        default:false,
        required:true,
    },
    createdAT:{
        type:Number,
        default:new Date
    },
    updatedAt:{
        type:Number,
        default:new Date
    }
})


const doctorSchedule = mongoose.models.doctorSchedule || mongoose.model('doctorSchedule',doctorSheduleSchema)

export default doctorSchedule