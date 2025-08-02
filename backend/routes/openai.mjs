import { request, response, Router } from "express";
import swaggerJsdoc from 'swagger-jsdoc'
import OpenAI from "openai";

const router = Router()

const openai = new OpenAI({
    apiKey:process.env.OPEN_AIKEY
})

router.post('/api/ai-assistant',async(request,response)=>{
   try {
     const {userMessage} = request.body
     console.log(userMessage)

    const chatCompletions = await openai.chat.completions.create({
        model:'gpt-4o',
        messages: [{ role: "user", content: userMessage}],
    })

    if(!chatCompletions)
        return response.json({success:false,message:"Error failed to create engine "})

    const chatResponse = chatCompletions.choices[0].message.content
    return response.json({sucess:true,chatResponse})
    console.log(chatResponse)
   } catch (error) {
    console.log(error)
    return response.json({success:false,message:error.message})

    
   }

    


})


export default router