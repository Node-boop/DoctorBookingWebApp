import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {ShopContext} from '../context/ShopContext'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
const Ai = () => {
  const [aiResponse,setAiResponse] = useState('')
  const [userMessage,setUserMessage] = useState('')
  const [loading,setLoading] = useState(false)
  const {backendUrl,token,navigate} = useContext(ShopContext)
  const [user,setUser] = useState([])
  const location = useLocation()

  useEffect(()=>{
    if(location.pathname.includes('/ai-chat')){
      document.title = "Medicure | AI ASSITANT"
    }
  },[location])

  const fetchProfile = async()=>{
    try {
      const response =await axios({
        url:backendUrl + '/api/users/profile',
        method:"get",
        headers:{
          authorization: `Bearer ${token}`
        }
      })
    
    if(response.data.success){
      setUser(response.data.user)
      console.log(response.data.user)
    }
    else
    {
      toast.error(response.data.message)
    }
    } catch (error) {
      toast.error(error.message)
      
    }
  }
  useEffect(()=>{
    fetchProfile()
  },[token])

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    if(!token)
      navigate('/auth0')
    
    const response =  await axios.post(backendUrl + '/api/ai-assistant',{userMessage},{headers:{
      authorization:`Bearer ${token}`
    }})
    setLoading(true)
    setUserMessage('')
    if(response.data.success){
      setAiResponse(response.data.chatResponse)
      setLoading(false)
     
    }
    else{
      toast.error(response.data.message)
      setLoading(false)
    }
  }
  return (
    <div className='w-full'>
      <div className='flex w-full flex-col-reverse items-center mt-10 '>

        <form onSubmit={onSubmitHandler} className='border border-gray-300 rounded-3xl py-10 px-10 bottom-1'>
          <div className='flex gap-5'>
              <input onChange={(e)=>setUserMessage(e.target.value)} value={userMessage} type="text" className='px-5 py-2 w-full outline-none' placeholder='How may i help you today?'/>
              
              
              <button type='submit' className='border border-gray-300 bg-white px-3 py-2'>send</button>
          </div>

          <div>
            <p className='text-4xl'>+</p>
          </div>
        </form>

        <div className='mb-10 text-start justify-start'>

          {
            loading && !aiResponse ? <p>Loading...</p> : ''
          }

          {
            aiResponse ? <p>{aiResponse}</p> : <p className={`${loading ? 'hidden' : 'block'}`}>Hello {user.firstName}</p>
          }

          <div>
            
          </div>

          
        </div>
      </div>
  </div>
  )
}

export default Ai