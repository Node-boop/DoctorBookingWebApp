import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    patientID:{
        type:String
    },
    doctorID:{
        type:String
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    comment:{
        type:String
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

const review = mongoose.models.review || mongoose.model('review',reviewSchema)

export default review