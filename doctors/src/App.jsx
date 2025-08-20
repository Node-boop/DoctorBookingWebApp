import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { DoctorContext } from './context/DoctorContext'
import Auth from './components/Auth'
import Header from './components/Header'
import SideBar from './components/SideBar'
import Profile from './pages/Profile'
import { ToastContainer,toast } from 'react-toastify'
import Dashboard from './pages/Dashboard'


function App() {
  const [count, setCount] = useState(0)
  const {token,setToken,showSidebar,setShowSidebar} = useContext(DoctorContext)

  return (
    <div className="min-h-screen">
       <ToastContainer />

      {
        !token ? <Routes>
          <Route path='/' element={<Auth />}/>
        </Routes> : 
        
        
        <>
          
         
          
          <div className="flex w-full">

            <SideBar/>

          
              <div className={`w-[70%] mx-auto ml-[max(5vw,25px)] my-2  ${!showSidebar ? 'w-[100%]' : 'w-[80%]'}`} >
                <Header />
                <Routes>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/dashboard'  element={<Dashboard/>}/>

                </Routes>

              </div>
            
          </div>
          
            
          

        </>
      }




     
    </div>
  )
}

export default App
