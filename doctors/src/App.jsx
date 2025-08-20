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
    <div>
       <ToastContainer />

      {
        !token ? <Routes>
          <Route path='/' element={<Auth />}/>
        </Routes> : 
        
        
        <div>
          <Header />
         

          <div className={`w-[18%] max-sm:w-[100%] ${showSidebar ? 'right-0 bottom-0 overflow-hidden transition-all duration-500' : 'hidden'}`}>
            <SideBar/>

          </div>
          <div className='w-[80%] mx-auto'>

            <Routes>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/dashboard'  element={<Dashboard/>}/>

            </Routes>

          </div>
          

        </div>
      }




     
    </div>
  )
}

export default App
