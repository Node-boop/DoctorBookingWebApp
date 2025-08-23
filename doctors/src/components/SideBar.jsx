import React,{useState,useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
const SideBar = () => {

  const [showAppointment,setShowAppointment] = useState(false)
  const [showSchedule,setShowSchedule] = useState(false)
  
  const {token,setToken,showSidebar,setShowSidebar,currentPage,setCurrentPage} = useContext(DoctorContext)

  return (
    <div id='sideBar' className={`w-[18%] min-h-screen top-0 bg-white shadow-md absolute border-r- border-gray-300 h-[100vh] px-5 scroll-smooth dark:bg-slate-950 max-sm:w-[80%] ${showSidebar ? 'block transition-all duration-500' : 'hidden'}`}>
      
      <div className='hidden mt-2' >
        <input type="text" name="" id="" className='border-2 px-3 py-3 outline-none w-[97%] border-gray-300 rounded-lg focus:bg-base-300' placeholder='Search'/>
      </div>

      <div className="hidden flex gap-1 items-center justify-end mt-3 mr-3 hover:text-dark">

        <div className="flex gap-1 items-center bg-base-300 px-4 py-2 ">
          <i className="fa fa-arrow-left"></i>
        <p>Back</p>
          
        </div>
        
        
      </div>

      <div className="flex justify-between mt-3 mb-10 ">
        <p className="text-xl text-center font-bold">Meddicure</p>

        <div onClick={()=>setShowSidebar(false)} className="flex gap-1 items-center bg-base-300 px-4 py-2 text-xs rounded-lg cursor-pointer">
          <i className="fa fa-arrow-left"></i>
        <p>Back</p>
          
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-3'>
        <div onClick={setCurrentPage("Dashboard")}>
            <NavLink  onClick={()=>setShowSidebar(!showSidebar)} to="/dashboard" className='flex gap-1 h-[40px] rounded-lg justify-start px-4 cursor-pointer items-center hover:bg-base-300 '>
          <i className='fa fa-home text-slate-600 text-sm'></i>
          <p  className="text-sm">Dashboard</p>
        </NavLink>
          
        </div>
      

        <div onClick ={()=>setCurrentPage("Appointments")}>
          <div onClick={()=>setShowAppointment(!showAppointment)}  className='flex gap-21 h-[40px] rounded-lg justify-start px-4 cursor-pointer items-center hover:bg-base-300 '>
            <p className="text-sm">Appointments</p>
            <i className={`fa fa-chevron-right text-slate-600 text-sm ${showAppointment ? 'rotate-90' : ''} ${showSchedule ? 'rotate-360' : ''}`}></i>
        </div>

        <div className={`flex flex-col mt-3 cursor-pointer ${showAppointment ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-start px-8 hover:bg-base-300 py-3">
              <p className="bg-base-300 text-sm rounded-lg px-3 hover:bg-white">New</p>
            </div>

             <div className="flex items-center justify-start px-8 hover:bg-base-300 py-3">
              <p className="rounded-lg text-sm px-3 hover:bg-white">Settled</p>
            </div>

            <div className="flex items-center justify-start px-8 hover:bg-base-300 py-3">
              <p className="rounded-lg text-sm px-3 hover:bg-white">Cancelled</p>
            </div>
            
          </div>
          
        </div>

        <div onClick ={()=>setCurrentPage("Schedules")}>
           <div onClick={()=>setShowSchedule(!showSchedule)}  className='flex gap-30 h-[40px] rounded-lg justify-start px-4 cursor-pointer items-center hover:bg-base-300 '>
            <p className="text-sm">schedules</p>
            <i className={`fa fa-chevron-right text-slate-600 text-sm ${showSchedule ? 'rotate-90' : ''} ${showAppointment ? 'rotate-360' : ''}`}></i>
          </div>

          <div className={`flex flex-col mt-3 cursor-pointer ${showSchedule ? 'block' : 'hidden'}`}>
            <div className="flex gap-3 items-center justify-start px-8 hover:bg-base-300 py-3">
              
              <p className="bg-base-300 text-sm rounded-lg px-3 hover:bg-white">New</p>
            </div>

             <div className="flex items-center justify-start px-8 hover:bg-base-300 py-3">
              <p className="rounded-lg text-sm px-3 hover:bg-white">Available</p>
            </div>

            <div className="flex items-center justify-start px-8 hover:bg-base-300 py-3">
              <p className="rounded-lg text-sm px-3 hover:bg-white">Overdue</p>
            </div>
            
          </div>
          
        </div>

         <NavLink onClick ={()=>setCurrentPage("Messages")} to="/payments" className='flex gap-1 h-[40px] rounded-lg justify-start px-4 cursor-pointer items-center hover:bg-base-300 '>
          <i className='fa fa-wallet text-slate-600 text-sm'></i>
          <p className="text-sm">Payments</p>
        </NavLink>

         <NavLink onClick ={()=>setCurrentPage("Messages")} to="/messages" className='flex gap-1 h-[40px] rounded-lg justify-start px-4 cursor-pointer items-center hover:bg-base-300 '>
          <i className='fa fa-envelope text-slate-600 text-sm'></i>
          <p className="text-sm">Messages</p>
        </NavLink>

         <NavLink onClick ={()=>setCurrentPage("Comments")} to="/comments" className='flex gap-1 h-[40px] rounded-lg justify-start px-4 cursor-pointer items-center hover:bg-base-300 '>
          <i className='fa fa-comment text-slate-600 text-sm'></i>
          <p className="text-sm">Comments</p>
        </NavLink>

         <NavLink onClick ={()=>setCurrentPage("Ratings")} to="/reviews" className='flex gap-1 h-[40px] rounded-lg justify-start px-4 cursor-pointer items-center hover:bg-base-300 '>
          <i className='fa fa-star text-slate-600 text-sm'></i>
          <p className="text-sm">Ratings</p>
        </NavLink>

         <NavLink onClick ={()=>setCurrentPage("Statistics")} to="/statistics" className='flex gap-1 h-[40px] rounded-lg justify-start px-4 cursor-pointer items-center hover:bg-base-300 '>
          <i className="fas fa-chart-pie" aria-hidden="true"></i>
          <p className="text-sm">Stats</p>
        </NavLink>


        <div className="flex px-4">
          <label className="flex cursor-pointer gap-2">
             <span className="label-text"><i className="fa fa-moon"></i></span>
         
          <input type="checkbox" value="dark" className="toggle theme-controller" />
          <span className="label-text"><i className="fa fa-sun"></i></span>
        </label>
          
        </div>



        
       



      </div>

    </div>
  )
}

export default SideBar