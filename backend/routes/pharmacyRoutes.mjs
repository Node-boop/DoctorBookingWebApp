import { request, response, Router } from "express";
import {v2 as cloudinary} from 'cloudinary'
import upload from "../middleware/multer.mjs";
import pharmacy from "../models/pharmacy.mjs";
import { matchedData, validationResult } from "express-validator";
import adminMiddleware from '../middleware/adminMiddleware.mjs'
const router = Router()

// get all medicines
// This route retrieves all medicines from the pharmacy collection
// It uses the pharmacy model to query the database for all medicine documents.
// If successful, it returns a 200 OK status with the list of medicines.
// If no medicines are found, it returns a 404 Not Found status with an appropriate message
// The response includes a success flag and the list of medicines.
// The response is in JSON format, making it easy to consume by the client-side application.
// The user must be authenticated to access this route, enforced by the adminMiddleware.
// The adminMiddleware checks if the user is an admin before allowing access to this route.
// If the user is not an admin, it returns a 403 Forbidden status with a message

/**
 * @swagger
 * /api/pharmacy/all:
 *   get:
 *     summary: Get all medicines
 *     description: Retrieve all medicines from the pharmacy collection.
 *     tags: [Pharmacy]
 *     responses:
 *       200:
 *         description: Successfully retrieved all medicines.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PharmacyModel'
 *       403:
 *         description: Forbidden access. User must be an admin.
 *       404:
 *         description: No medicines found.
 *       500:
 *        description: Internal server error while retrieving medicines.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/api/pharmacy/all',adminMiddleware,async(request,response)=>{
    const medicines = await pharmacy.find({})

    if(!medicines)
        return response.status(404).json({success:false,message:"No medicines retieved"})

    return response.status(200).json({success:true,medicines:medicines})
})


// Adding a new medicine
// This route allows an admin to add a new medicine to the pharmacy collection
// It expects the medicine details to be provided in the request body.
// The medicine details include name, category, price, instock quantity, and images.
// It uses the pharmacy model to create a new medicine document in the database.
// The images are uploaded to Cloudinary and their URLs are stored in the database.
// If successful, it returns a 201 Created status with a success message.
// If there are validation errors, it returns a 400 Bad Request status with the error details
// The response includes a success flag and a message indicating the success of the operation.
// The response is in JSON format, making it easy to consume by the client-side application.
// The user must be authenticated to access this route, enforced by the adminMiddleware.
// The adminMiddleware checks if the user is an admin before allowing access to this route.
// If the user is not an admin, it returns a 403 Forbidden status with a message


/**
 * @swagger
 * /api/pharmacy/add-medicine:
 *   post:
 *     summary: Add a new medicine
 *     description: Add a new medicine to the pharmacy collection.
 *     tags: [Pharmacy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PharmacyModel'
 *     responses:
 *       201:
 *         description: Successfully added new medicine.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PharmacyResponse'
 *       400:
 *         description: Bad request. Validation errors occurred.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden access. User must be an admin.
 *       500:
 *         description: Internal server error while adding medicine.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/api/pharmacy/add-medicine',adminMiddleware,upload.fields([{name:'image1',maxCount:1},{name:'imag2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),async(request,response)=>{
    // Extracting the necessary fields from the request body
    // It expects the request body to contain the fields: name, category, price, and
    const {name,category,price,instock} = request.body
    // It uses the matchedData function to extract the validated data from the request
    // and the validationResult function to check for any validation errors.
    const result = validationResult(request)
    // using express validator to check for errors
    if(!result.isEmpty())
        return response.status(400).json({success:false,error:result.array()})


    const data = matchedData(request)
    // Extracting the images from the request files
    // It expects the images to be uploaded using a file upload middleware like multer.
    const image1 = request.files.image1 && request.files.image1[0]
    const image2 = request.files.image2 && request.files.image2[0] // getting imaes from the request
    const image3 = request.files.image3 && request.files.image3[0]
    const image4 = request.files.image4 && request.files.image4[0]

    // Filtering out any undefined images
    // This ensures that only the images that were actually uploaded are processed.
    // It uses the filter method to remove any undefined items from the array.
    // The images array will contain only the defined image objects.
    const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)
    // If no images were uploaded, it returns a 400 Bad Request status with an error message
    // This ensures that the request contains at least one image before proceeding.
    const imageUrl = await Promise.all(
        // Uploading each image to Cloudinary and getting the secure URL
        // It uses the cloudinary uploader to upload each image and returns the secure URL.
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    )
    // If no images were uploaded, it returns a 400 Bad Request status with an error message
    if(imageUrl.length === 0)
        return response.status(400).json({success:false,message:"Please upload at least one image"})    

    // Creating a new medicine document in the pharmacy collection
    // It uses the pharmacy model to create a new document with the provided data.
    // The new medicine document includes the name, category, price, instock quantity, and
    // the URLs of the uploaded images.
    // It sets the createdAt and updatedAt fields to the current date.
    // After creating the document, it saves it to the database.
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