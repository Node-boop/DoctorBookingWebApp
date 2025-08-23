import React,{useState,useEffect,useContext} from 'react'
import {useLocation} from 'react-router-dom'

const About = () => {

  const location = useLocation()

  useEffect(()=>{
    document.title = "Medicure | About Us"
  },[location])
  return (
    <div>
      <div className="flex w-full">

         <div className='w-1/2'>
          
      
        </div>

         <div>
      
        </div>
                
      </div>
    </div>
  )
}

export default About