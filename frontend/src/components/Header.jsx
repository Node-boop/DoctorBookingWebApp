import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import account_icon from '../assets/user-circle.svg'
import search_icon from '../assets/search.png'

const Header = () => {

    const {navigate,token,setToken,showAccountMenu,setShowAccountMenu,showSearch,setShowSearch} = useContext(ShopContext)


    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        navigate('/')
    }
    
    
  return (
    <div className='flex  w-full sticky mx-auto  justify-between px-5 py-5 bg-white lg:justify-between sm:justify-center  md:justify-between max-md:justify-between dark:bg-gray-800 dark:border-b dark:text-white'>

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
            token ? 

            <div className="flex gap-4">

                 <button className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </button>

                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow dark:bg-gray-800">
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li onClick={logout} ><a>Logout</a></li>
                  </ul>
                </div>
        </div>
            
            : <div className='flex gap-4'>
             <div  className='lg:flex sm:hidden max-sm:hidden md:hidden max-md:hidden'>
                 <button className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </button>
            </div>
            <div className='lg:flex sm:hidden max-sm:hidden md:hidden max-md:hidden'>
                <button onClick={()=>navigate('/auth0')} className='bg-white shadow cursor-pointer px-5 py-1.5 rounded-full font-light font-mono m-0 dark:bg-slate-600'>Login / Signup</button>
            </div>

            <div>

            </div>

        </div>
        }
        

    </div>
  )
}

export default Header