import React, { useContext,useState } from 'react'
import Search from '../components/Search'
import Card from '../components/Card'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Booking = () => {
  const {showSearch,setShowSearch,backendUrl,doctors} = useContext(ShopContext)


  return (
    <div className='flex justify-between mt-4 dark:bg-gray-800' id='booking'>

      
      <div className="w-[100%] h-[100%] rounded-lg px-3 py-5 ">
        <p className='hidden text-center text-slate-900 mb-3'>All Doctors</p>
        <hr className="text-slate-200 mb-3"/>
        {/* Search Component for searching doctors by name */}
        <div className={`flex justify-center items-center max-w-[500px] mx-auto cursor-pointer`}>
          <Search />
        </div>

        <div className="flex items-center justify-center mt-5 font-bold underline text-primary">
          <p>All Doctors</p>
          
        </div>

        <div className='grid grid-cols-2 gap-3 mt-4 lg:grid-cols-6 md:grid-cols-1 sm:grid-cols-2 max-sm:grid-cols-2 dark:bg-gray-800'>
          
          {
            doctors.map((doctor,index)=>(

              <div key={index}  className='flex justify-center'>
                <Card lastName={doctor.lastName} firstName={doctor.firstName} image = {doctor.image[0]} />  
              </div>


              ))
          }
          
          
        </div>
        

      </div>

      
      
    </div>
  )
}

export default Booking