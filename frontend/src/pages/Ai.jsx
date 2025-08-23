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
  const [errorMessage,setErrorMessage] = useState('')
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
    try{
      setLoading(true)
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
      //toast.error(response.data.message)
      setLoading(false)
      setErrorMessage(response.data.message)
    }
    }
    catch(error)
    {
      //toast.error(response.data.message)
      setErrorMessage(response.data.message)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='w-full dark:bg-gray-800'>
      <div className='flex w-full flex-col-reverse items-center mt-10  '>

        <form onSubmit={onSubmitHandler} className='border border-gray-300 rounded-3xl py-10 px-10 bottom-1 dark:text-white'>
          <div className='flex gap-5'>
              <input onChange={(e)=>setUserMessage(e.target.value)} value={userMessage} type="text" className='px-5 py-2 w-full outline-none' placeholder='How may i help you today?'/>
              
              
              <button type='submit' className='border border-gray-300 bg-white px-3 py-2 dark:bg-slate-900 dark:text-white'>send</button>
          </div>

          <div className="flex justify-between mt-4">
            <i className="fa fa-plus"></i>

            <i className="fa fa-microphone text-slate-700"></i>
          </div>
        </form>

        <div className='mb-10 text-start justify-start'>

          {
            loading ? <p>Just a Second

              <span className="loading loading-bars loading-lg ml-2"></span>
              <span className="loading loading-bars loading-xl"></span>
            </p> : ''
          }

          {
            aiResponse || errorMessage ? <div className="text-sm text-center justify-center text-slate-700 flex-wrap break-normal"><p >{aiResponse}</p><p className="break-normal flex-wrap">{errorMessage}</p></div> : <p className={`${loading ? 'hidden' : 'block text-sky-600 font-bold text-xl'}`}>Hello {user.firstName}</p>
          }



          <div>
            
          </div>

          
        </div>
      </div>

      
  </div>
  )
}

export default Ai