import React from 'react'
import hero_image from '../assets/banner-doctor.svg'

const Hero = () => {
  return (
    <div className='flex w-full gap-2 items-center justify-center bg-amber-50 lg:flex  max-sm:flex-col sm:w-full'>

        <div className='flex flex-col gap-6 bg-amber-200 p-6 shadow-lg rounded-2xl max-sm:absolute max-sm:bg-transparent'>
            <p className='text-3xl font-bold text-slate-400 font-sans'>Where Your Health Is Our priority</p>
            <p className='text-3xl text-slate-600 font-bold font-sans '>Services That Expand Horizons</p>
             <p className='text-slate-600 font-medium font-stretch-80% font-sans'></p>
            <p className="typewriter">Book your appointment today with best and most experienced doctors.</p>

           
            <div className='flex gap-5 lg:flex sm:flex max-sm:flex-col max-sm:justify-center'>
                <button className='max-w-[200px] text-sm font-semibold text-slate-600 shadow-[8px_8px_16px] cursor-pointer hover:bg-[#ffffff] px-3 py-2 rounded-full bg-white'>Book Now</button>
                <button className='max-w-[200px] text-sm font-semibold text-slate-600 shadow-[8px_8px_16px] cursor-pointer hover:bg-[#ffffff] px-3 py-2 rounded-full bg-white'>Learn More</button>
            
            </div>
            
        </div>

        <div className='hidden bg-white shadow p-4 rounded-lg '>
            <p className='font-light'>1000+ happy users</p>

        </div>

        <div className=' '> 
            <img src={hero_image} className='h-[80vh]' alt="" />
            
        </div>
          
    </div>
  )
}

export default Hero