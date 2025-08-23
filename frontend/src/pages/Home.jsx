import React from 'react'
import Hero from '../components/Hero'
import neuro_image from '../assets/neuro.jpg'
import mission_image from '../assets/doctor-banner.png'
import vision_image from '../assets/banner-doctor3.svg'
import about_image from '../assets/gyna.jpg'
import arrow_icon from '../assets/arrow-right.svg'
import doc1 from '../assets/doctor-thumb-22.jpg'
import doc2 from '../assets/doctor-thumb-23.jpg'
import doc3 from '../assets/doctor-thumb-24.jpg'
import doc4 from '../assets/banner-doctor.svg'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import sha_logo from '../assets/SHA.png'
import who_logo from '../assets/WHO.png'
import redcross_logo from '../assets/redcross.jpeg'
import kmpdu_logo from '../assets/kmpdu.jpeg'
import john_logo from '../assets/john.png'
import amref_logo from '../assets/amref.jpeg'

const Home = () => {
  return (
    <div className='mt-5 dark:bg-slate-950'>
      <Hero />

     
      
    <div className='flex flex-col mt-3'>
      <p className='font-serif text-center font-bold mt-3 mb-3'>Our Specialities</p>

      <div className='w-full grid gap-6 grid-cols-2 px-3 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 max-md:grid-cols-4 max-sm:grid-cols-2'> 
          <div className='border border-gray-300 p-2 gap-2 rounded-2xl text-slate-500 flex items-center justify-center cursor-pointer hover:bg-sky-400 hover:text-white transition-all duration-500'>
            <p className='text-center font-bold'>Cardiology</p>
            <i className='fa fa-arrow-right mt-1 text-xl hidden font-serif'></i>

          </div>

          <div className='border border-gray-300 p-2 gap-2 rounded-2xl flex items-center text-slate-500 justify-center cursor-pointer hover:bg-sky-400 hover:text-white transition-all duration-500'>
            <p className='text-center'>Psyhology</p>
            <i className='fa fa-arrow-right mt-1 text-xl hidden font-serif'></i>

          </div>

          <div className='border border-gray-300 py-2 gap-2 rounded-2xl flex items-center text-slate-500 justify-center cursor-pointer hover:bg-sky-400 hover:text-white transition-all duration-500'>
            <p className='text-center font-serif '>Onchology</p>
            <i className='fa fa-arrow-right mt-1 text-xl hidden font-serif'></i>


          </div>


          <div className='border border-gray-300 p-2 gap-2 rounded-2xl flex items-center justify-center text-slate-500 cursor-pointer hover:bg-sky-400 hover:text-white transition-all duration-500'>
            <p className='text-center'>Peadtrician</p>
            <i className='fa fa-arrow-right mt-1 text-xl hidden font-serif'></i>

          </div>

          <div className='border border-gray-300 p-2 gap-2 rounded-2xl flex items-center justify-center text-slate-500 cursor-pointer hover:bg-sky-400 hover:text-white transition-all duration-500'>
            <p className='text-center'>Radiology</p>
            <i className='fa fa-arrow-right mt-1 text-xl hidden font-serif'></i>

          </div>

          <div className='border border-gray-300 p-2 gap-2 rounded-2xl flex items-center justify-center text-slate-500 cursor-pointer hover:bg-sky-400 hover:text-white transition-all duration-500'>
            <p className='text-center'>Neurology</p>
            <i className='fa fa-arrow-right mt-1 text-xl hidden font-serif'></i>

          </div>

          <div className='border border-gray-300 p-2 gap-2 rounded-2xl flex items-center justify-center text-slate-500 cursor-pointer hover:bg-sky-400 hover:text-white hover:ease-in-out transition-all duration-500'>
            <p className='text-center'>Dentistry</p>
            <i className='fa fa-arrow-right mt-1 text-xl hidden font-serif'></i>

          </div>
      </div>

    </div>


    <div className='flex flex-col mt-4 border-t border-gray-300'>
        <p className='text-center font-serif font-semibold mb-5 mt-5 underline'>Top Doctors</p>

        <div className='w-full px-3 grid gap-6 grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2 md:grid-cols-3 max-md:grid-cols-3'>
          <div className='flex flex-col bg-white shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] py-3 px-3 dark:bg-slate-950 dark:shaow-xs'>
            <picture>
              <img src={doc1} className='w-full rounded-full' alt="" />
            </picture>

            <div className='flex flex-col mt-2'>
              <p className='font-serif'>Dr.James King</p>
              <p  className='font-serif'>cdp: 80</p>
              <p className='font-serif'>Nationality: Cuban</p>


            </div>


          </div>

           <div className='flex flex-col bg-white shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] max-w-[300px] py-3 px-3'>
            <picture>
              <img src={doc2} className='w-full rounded-full' alt="" />
            </picture>

            <div className='flex flex-col mt-2'>
              <p className='font-serif'>Dr.Priyan Ashanovsi</p>
              <p  className='font-serif'>cdp: 86</p>
              <p className='font-serif'>Nationality: Russian</p>


            </div>


          </div>

           <div className='flex flex-col bg-white shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] max-w-[300px] py-3 px-3'>
            <picture>
              <img src={doc3} className='w-full rounded-full' alt="" />
            </picture>

            <div className='flex flex-col mt-2'>
              <p className='font-serif'>Dr.Ashraf Khan</p>
              <p  className='font-serif'>cdp: 84</p>
              <p  className='font-serif'>Nationality: Morrocoan</p>



            </div>


          </div>

          <div className='flex flex-col bg-white shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] max-w-[300px] py-3 px-3'>
            <picture>
              <img src={doc4} className='w-full rounded-full' alt="" />
            </picture>

            <div className='flex flex-col mt-2'>
              <p className='font-serif'>Dr.Mike Murphy</p>
              <p  className='font-serif'>cdp: 84</p>
              <p  className='font-serif'>Nationality: American</p>



            </div>


          </div>

        </div>

    </div>

    <div className='hidden flex flex-col items-center justify-center mt-4 border-t border-gray-300'>
    <p className='text-slate-500 font-serif text-xl text-center mt-4 mb-4'>Our Partners</p>
      <div className='w-full px-15 gap-6 items-center justify-center grid grid-cols-2 lg:grid-cols-5 sm:grid-cols-3 max-sm:grid-cols-2 md:grid-cols-3 max-md:grid-cols-4'>
      
        <div className='bg-white items-center w-20 justify-center shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]'>
          <p className='mb-3 text-sm font-serif text-slate-500'>WHO</p>
          <picture>
            <img src={who_logo} className='w-18 rounded-2xl' alt="" />
          </picture>
        </div>

        <div className='bg-white items-center w-20 justify-center shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]'>
          <p className='text-sm font-serif'>St.John</p>
          <picture>
            <img src={john_logo} className='w-20' alt="" />
          </picture>
        </div>

        <div className='bg-white items-center w-24 justify-center shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]'>
          <p className='mb-3 text-sm font-serif'>REDCROSS</p>
          <picture>
            <img src={redcross_logo} className='w-20' alt="" />
          </picture>
        </div>

        <div className='flex flex-col bg-white items-center w-20 justify-center shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]'>
          <p className='mb-3 text-sm font-serif'>KMPDU</p>
          <picture>
            <img src={kmpdu_logo} className='w-24' alt="" />
          </picture>
        </div>

         <div className='bg-white items-center w-20 justify-center shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]'>
          <p className='text-sm text-slate-500 mb-3 font-serif'>AMREF</p>
          <picture>
            <img src={amref_logo} className='w-20' alt="" />
          </picture>
        </div>

         
      </div>
    </div>

    <div className='w-full bottom-0 mt-5'>
      <NewsLetter />
      <Footer />

    </div>
    </div>
  )
}

export default Home