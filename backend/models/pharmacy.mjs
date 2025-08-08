import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
    medicineName:{
        type:String,
        required:true,
        trim:true,
        
    },
    category:{
        type:{String,required:true,trim:true}
    },
    price:{
        type:Number,
        required:true,
        default:0.00

    },
    instock:{
        type:Number,
        required:true,
    },
    image:{type:Array},
    available:{
        type:Boolean,
        default:true,
    },
    createdAt:{type:Number,default:new Date},
    updatedAt:{type:Number,default:new Date}
})

const pharmacy = mongoose.models.pharmacy || mongoose.model('pharmacy',pharmacySchema)

export default pharmacy