import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import account_icon from '../assets/user-circle.svg'
import more_icon from '../assets/horizontal-dots.svg'
import ai_icon from '../assets/bolt.svg'
import booking_icon from '../assets/grid.svg'
const MenuBottom = () => {
  return (
    <div>
       <div id="MenuBottom" className='w-full bg-[#fff] h-[80px] rounded-lg px-5 py-5 dark:text-white dark:bg-gray-800'>
        <div className='flex justify-between'>

           

            <NavLink className={'flex flex-col gap-4 items-center'} to={'/ai-chat'}>
                <i  className='fa fa-bolt w-6' alt="" ></i>
                <p className=' text-gray-400 text-sm '>AiDoctor</p>

            </NavLink>

              <NavLink className={'flex flex-col gap-4 items-center'} to={'/booking'}>
                 <i  className='fa fa-grip-horizontal w-6' alt="" ></i>
                <p className='text-gray-400 text-sm '>booking</p>
                

            </NavLink>

                <NavLink className={'flex flex-col gap-4 items-center'} to={'/'}>
                     <i  className='fa fa-home w-6' alt="" ></i>
                <p className=' text-gray-400 text-sm '>home</p>


                </NavLink>
              

             <NavLink to={"/profile"} className={'flex flex-col gap-4 items-center'}>

                <i  className='fa fa-user-circle w-6' alt="" ></i>
                <p className=' text-gray-400 text-sm '>account</p>
                
            </NavLink>

             <NavLink to={'/more'} className={'flex flex-col gap-4 items-center'}>
                 <i className='fa fa-ellipsis-h w-6' alt="" ></i>
                <p className=' text-gray-400 text-sm '>more</p>
                

            </NavLink>

            

        </div>

       </div>
    </div>
  )
}

export default MenuBottom