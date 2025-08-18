import React, { useContext } from 'react'
import Search from '../components/Search'
import Card from '../components/Card'
import { ShopContext } from '../context/ShopContext'

const Booking = () => {
  const {showSearch,setShowSearch} = useContext(ShopContext)
  return (
    <div className='flex justify-between mt-4' id='booking'>

      <div id="sideBar" className="hidden bg-white overflow-y-auto shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] w-[18%] h-[100%] py-5 px-3 rounded-lg">
        <p className='text-center text-slate-900 mb-3'>Filters</p>
        <hr className="text-slate-500 mb-3"/>
        {/* Search Component for searching doctors by name */}
        <p className='text-center text-slate-900 mb-3'>By Location</p>
        <hr className="text-slate-500 mb-3"/>

        <div className='flex flex-col gap-10 justify-center items-center overflow-auto'>
          <div className='flex gap-1 items-center px-3' >
            <input type="checkbox" name="location" id="" />
            <p>Nairobi</p>
          </div>

          <div className='flex gap-1 items-center px-3' >
            <input type="checkbox" name="location" id="" />
            <p>Nakuru</p>
          </div>  
          <div className='flex gap-1 items-center px-3' >
            <input type="checkbox" name="location" id="" />
            <p>Kisumu</p>
          </div>  
          <div className='flex gap-1 items-center px-3' >
            <input type="checkbox" name="location" id="" />
            <p>Mombasa</p>
          </div>
        </div>
        <hr className='mb-3 mt-4' />

        {/* Search Component for searching doctors by name */}
        <p className='text-center text-slate-900 mb-3 mt-5'>By Proffesion</p>
        < hr className="text-slate-500 mb-3"/>

        <div className='flex flex-col gap-10 justify-center items-center'>
          <div className='flex gap-1 items-center px-3' >
            <input type="checkbox" name="dentist" id="" />
            <p>Dentist</p>
           
          </div>

           <div className='flex gap-1 px-3' >
             <input type="checkbox" name="dentist" id="" />
            <p>Paeditrican</p>
           
          </div>

           <div className='flex gap-1 ' >
             <input type="checkbox" name="dentist" id="" />
            <p>Demartologist</p>
           
          </div>

           <div className='flex gap-1 ' >
             <input type="checkbox" name="dentist" id="" />
            <p>Opticians</p>
           
          </div>

           <div className='flex gap-1 ' >
             <input type="checkbox" name="dentist" id="" />
            <p>Neurosergion</p>
           
          </div>
            <div className='flex gap-1 ' >
              <input type="checkbox" name="dentist" id="" />
              <p>Cardiologist</p> 

            </div>

            <div className='flex gap-1 ' >
              <input type="checkbox" name="dentist" id="" />
              <p>General Physician</p>
            </div>

            <div className='flex gap-1 ' >
              <input type="checkbox" name="dentist" id="" />
              <p>Gynaecologist</p>
            </div>

            <div className='flex gap-1 ' >
              <input type="checkbox" name="dentist" id="" />
              <p>Orthopaedic</p>
            </div>

            <div className='flex gap-1 ' >
              <input type="checkbox" name="dentist" id="" />
              <p>Psychiatrist</p>
            </div>

            <div className='flex gap-1 ' >
              <input type="checkbox" name="dentist" id="" />
              <p>Urologist</p>
            </div>

            <div className='flex gap-1 ' >
              <input type="checkbox" name="dentist" id="" />
              <p>ENT Specialist</p>
            </div>

            <div className='flex gap-1 ' >
              <input type="checkbox" name="dentist" id="" />
              <p>General Surgeon</p>
            </div>

            <div className='flex gap-1 ' >
              <input type="checkbox" name="dentist" id="" />
              <p>Physiotherapist</p>
            </div>
          

          
        </div>
      </div>

      <div className="w-[100%] h-[100%] bg-white rounded-lg px-3 py-5">
        <p className='hidden text-center text-slate-900 mb-3'>All Doctors</p>
        <hr className="text-slate-200 mb-3"/>
        {/* Search Component for searching doctors by name */}
        <div className={`flex justify-center items-center max-w-[500px] mx-auto cursor-pointer`}>
          <Search />
        </div>

        <div className='grid grid-cols-2 gap-4 mt-4 lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-2 max-sm:grid-cols-2'>
          <div className='flex justify-center'>
            <Card />  
          </div>
          
        </div>
        

      </div>

      
      
    </div>
  )
}

export default Booking