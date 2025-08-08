import { request, response, Router } from "express";
import {v2 as cloudinary} from 'cloudinary'
import upload from "../middleware/multer.mjs";
import pharmacy from "../models/pharmacy.mjs";
import { matchedData, validationResult } from "express-validator";
import adminMiddleware from '../middleware/adminMiddleware.mjs'
const router = Router()

// get all medicines

router.get('/api/pharmacy/all',adminMiddleware,async(request,response)=>{
    const medicines = await pharmacy.find({})

    if(!medicines)
        return response.status(404).json({success:false,message:"No medicines retieved"})

    return response.status(200).json({success:true,medicines:medicines})
})


router.post('/api/pharmacy/add-medicine',adminMiddleware,async(request,response)=>{
    const {name,category,price,instock} = request.body

    const result = validationResult(request)
    // using express validator to check for errors
    if(!result.isEmpty())
        return response.status(400).json({success:false,error:result.array()})


    const data = matchedData(request)
    const image1 = request.files.image1 && request.files.image1[0]
    const image2 = request.files.image2 && request.files.image2[0] // getting imaes from the request
    const image3 = request.files.image3 && request.files.image3[0]
    const image4 = request.files.image4 && request.files.image4[0]


    const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

    const imageUrl = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    )

    const newMedicine = new pharmacy({
        medicineName:data.name,
        category:data.category,
        price,
        instock

    })

    await newMedicine.save()

    return response.status(201).json({success:true,message:"Success"})

})

// delelting a specific medicine

router.delete('/api/medicine/delete-one/:id',adminMiddleware,async(request,response)=>{
    const medicineID = request.params.id

    const findMedicine  = await pharmacy.findById(medicineID)

    if(!findMedicine)
        return response.status(404).json({success:false,message:`Medicine with id ${medicineID} not found`})


    await pharmacy.findByIdAndDelete(medicineID)

    return response.status(200).json({success:true,message:"Success"})

})

// updating the fields in the pharmacy model

router.post('/api/medicine/update/:id',adminMiddleware,async(request,response)=>{
    try {

        const {values} = request.body
        const medicineID = request.params.id
        const query = await pharmacy.findById(medicineID)
        
        if(!query)
            return response.status(404).json({success:false,message:`Medicine with id ${medicineID} not found`})

        const updatedItem = await pharmacy.findByIdAndUpdate(medicineID,values,{new:true})


        return response.status(200).json({success:true,message:"Success",item:updatedItem})

    } catch (error) {
        return response.status(404).json({success:false,error:error.message})
        
    }
})



export default router