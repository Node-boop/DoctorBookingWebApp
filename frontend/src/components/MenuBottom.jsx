import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import account_icon from '../assets/user-circle.svg'
import more_icon from '../assets/horizontal-dots.svg'
import ai_icon from '../assets/bolt.svg'
import booking_icon from '../assets/grid.svg'
const MenuBottom = () => {
  return (
    <div>
       <div id="MenuBottom" className='w-full bg-[#fff] shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] rounded-full px-5 py-2'>
        <div className='flex justify-between'>

           

            <NavLink className={'flex flex-col items-center'} to={'ai-chat'}>
                 <img src={ai_icon} className='w-6' alt="" />
                <p className='font-semibold text-gray-400 text-sm '>AiDoctor</p>
                

            </NavLink>

              <NavLink className={'flex flex-col items-center'} to={'/booking'}>
                 <img src={booking_icon} className='w-6' alt="" />
                <p className='font-semibold text-gray-400 text-sm '>booking</p>
                

            </NavLink>

                 <NavLink className={'flex flex-col'} to={'/'}>
                <p className='font-semibold text-gray-400 text-sm '>home</p>


            </NavLink>
              

             <NavLink className={'flex flex-col items-center'}>

                <img src={account_icon} className='w-6' alt="" />
                <p className='font-semibold text-gray-400 text-sm '>account</p>
                
            </NavLink>

             <NavLink className={'flex flex-col items-center'}>
                 <img src={more_icon} className='w-6' alt="" />
                <p className='font-semibold text-gray-400 text-sm '>more</p>
                

            </NavLink>

            

        </div>

       </div>
    </div>
  )
}

export default MenuBottom