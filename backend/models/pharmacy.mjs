import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
    medicineName:{
        type:String,
        required:[true,'Name field cannot be null'],
        trim:true,
        
    },
    category:{
        type:String,required:[true , 'Category is required'],trim:true
    },
    price:{
        type:Number,
        required:[true, 'Price field cannot be empty'],
        default:0.00

    },
    instock:{
        type:Number,
        required:true,
    },
    image:{
        type:Array,
        required:[true,'Image urls needed']
    },
    available:{
        type:Boolean,
        default:true,
    },
    createdAt:{type:Number,default:new Date},
    updatedAt:{type:Number,default:new Date}
})

const pharmacy = mongoose.models.pharmacy || mongoose.model('pharmacy',pharmacySchema)

export default pharmacy