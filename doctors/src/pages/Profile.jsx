import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import {DoctorContext} from '../context/DoctorContext'
import {toast} from 'react-toastify'


const Profile = () => {

  const [user,setUser] = useState([])
  const {backendURL,navigate,token,setToken} = useContext(DoctorContext)
  const [errorMessage,setErrorMessage] = useState('')
  const [loading,setLoading] = useState(false)
  const [successMessage,setSuccessMessage] = useState('')

  const fetchUserProfile = async()=>{

    try{

      setLoading(true)
      const response = axios.get(backendURL + '/api/users/doctors/profile',{},{headers:{
        "authorization":`Bearer ${token}`
      }})

      if(response.data.success)
      {
        setUser(response.data.user)


      }else{
        toast.error(response.data.message)
        setErrorMessage(response.data.message)
      }

    }catch(error){

      toast.error(error.message)
      setErrorMessage(error.message)

    }finally{
      setLoading(false)

    }

  }

  useEffect(()=>{
    fetchUserProfile()
  },[token])

  return (
    <div>Profile</div>
  )
}

export default Profile