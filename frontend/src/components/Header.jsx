import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import account_icon from '../assets/user-circle.svg'
import search_icon from '../assets/search.png'

const Header = () => {

    const {navigate,token,setToken,showAccountMenu,setShowAccountMenu} = useContext(ShopContext)


    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        navigate('/')
    }
    
    
  return (
    <div className='flex mt-3 w-full sticky mx-auto shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:animate-pulse  rounded-full justify-between px-5 py-5 bg-white lg:justify-between sm:justify-center max-sm:justify-center md:justify-between max-md:justify-between '>

        <div className='flex'>
            <h1 className='font-extrabold font-mono text-slate-600 text-2xl'>Meddicure</h1>

        </div>

        <div className='flex gap-8 font-light font-mono lg:flex sm:hidden max-sm:hidden md:hidden max-md:hidden'>
            <NavLink to={'/'} className={`text-center  hover:text-orange-400 `}>
                <p className=''>Home</p>
               
            </NavLink>

             <NavLink to={'/booking'}  className={`text-center hover:text-orange-400 `}>
                <p>Booking</p>
            </NavLink>


             <NavLink to={'ai-chat'}  className={`text-center hover:text-orange-400 `}>
                <p>AiDoctor</p>
            </NavLink>

             <NavLink to={'pharmacy'}  className={`text-center hover:text-orange-400`}>
                <p>Pharmacy</p>
            </NavLink>
             <NavLink to={'/about-us'}  className={`text-cente hover:text-orange-400`}>
                <p>About</p>
            </NavLink>

             <NavLink to={'contact-us'}  className={`text-center hover:text-orange-400`}>
                <p>Contact</p>
            </NavLink>
            

        </div>
        {
            token ? <div className='flex gap-4 px-6'>
           <div className='lg:flex sm:hidden max-sm:hidden md:hidden max-md:hidden'>
                <img src={search_icon} className='w-8 cursor-pointer' alt="" />
            </div>

            <div onMouseEnter={()=>setShowAccountMenu(!showAccountMenu)} onMouseLeave={()=>setShowAccountMenu(false)} className='flex items-center justify-center'>
            <div className='lg:flex sm:hidden max-sm:hidden md:hidden max-md:hidden'>
                <img src={account_icon} className='w-6 cursor-pointer' alt="" />

               
            </div>
             <div className={`flex flex-col gap-4 font-serif text-sm px-3 py-3 w-[86px] mr-auto text-center justify-center text-white bg-slate-400 ${showAccountMenu ? 'block absolute top-12' : 'hidden'}`}>
                    <p className='border-b border-gray-300 py-1 cursor-pointer hover:bg-slate-600'>Profile</p>
                    <p className='border-b border-gray-300 py-1 cursor-pointer hover:bg-slate-600'>Account</p>
                    <p className='border-b border-gray-300 py-1 cursor-pointer hover:bg-slate-600'>settings</p>
                    <p onClick={logout} className='cursor-pointer hover:bg-slate-600 py-1'>logout</p>

                </div>
            </div>

            <div>

            </div>

        </div> : <div className='flex gap-4'>
             <div className='lg:flex sm:hidden max-sm:hidden md:hidden max-md:hidden'>
                <img src={search_icon} className='w-8 cursor-pointer' alt="" />
            </div>
            <div className='lg:flex sm:hidden max-sm:hidden md:hidden max-md:hidden'>
                <button onClick={()=>navigate('/auth0')} className='bg-white shadow cursor-pointer px-5 py-1.5 rounded-full font-light font-mono m-0'>Login / Signup</button>
            </div>

            <div>

            </div>

        </div>
        }
        

    </div>
  )
}

export default Header