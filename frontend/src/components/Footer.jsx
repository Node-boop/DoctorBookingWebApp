import React from 'react'


const Footer = () => {
  return (
    <div>
        <div className='bg-white flex items-center justify-between gap-5 mt-3 p-6 lg:flex sm: flex max-sm:flex-col dark:bg-slate-950'>
            <div className='flex flex-col'>

                <p className='font-bold text-2xl text-slate-600 font-mono'>Meddicure</p>
                <p className='text-start'>Lorem ipsum dolor sit amet consect exercitationem.</p>

            </div>

            <div className='flex flex-col gap-4'>
                <div>
                    <p className='font-bold text-2xl font-mono'>Quick Links</p>

                </div>

                <div className='cursor-pointer'>
                    <p className='font-serif text-sm hover:underline hover:text-sky-500'>Home</p>
                    <p className='font-serif text-sm hover:underline hover:text-sky-500'>Booking</p>
                    <p className='font-serif text-sm hover:underline hover:text-sky-500'>Ai</p>
                    <p className='font-serif text-sm hover:underline hover:text-sky-500'>Pharmacy</p>
                </div>
                
            </div>

            <div className='flex flex-col'>
                <div>
                    <p className='font-bold text-2xl font-mono'>Important</p>

                </div>

                <div className='cursor-pointer gap-4'>
                    <p className='font-serif text-sm hover:underline hover:text-sky-500'>Home</p>
                    <p className='font-serif text-sm hover:underline hover:text-sky-500'>Appointments</p>
                    <p className='font-serif text-sm hover:underline hover:text-sky-500'>Refund Policy</p>
                    <p className='font-serif text-sm hover:underline hover:text-sky-500'>FAQs</p>
                </div>
                
            </div>

            <div className='flex flex-col'>
                <div>
                    <p className='font-bold text-2xl font-mono'>Reach Out</p>

                </div>

                <div>
                    <p className='font-serif text-sm'>Tel: +254704034126</p>
                    <p className='font-serif text-sm'>Email:info@meddicure.co.ke</p>
                    <p className='font-serif text-sm'>Ai</p>
                    <p className='font-serif text-sm'>Pharmacy</p>
                </div>
                
            </div>

            

        </div>

        <div>
            <p className='text-center font-serif text-sm underline cursor-pointer hover:text-sky-500'>Copyright Meddicure@2025 All right reserverd </p>
        </div>
    </div>
  )
}

export default Footer