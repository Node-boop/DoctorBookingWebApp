import React,{useState} from "react";
import { ToastContainer,toast } from "react-toastify";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Ai from "./pages/Ai";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer";
import MenuBottom from "./components/MenuBottom";
import Profile from "./pages/Profile";
import VideoCall from './components/VideoCall'
import DoctorDetail from "./pages/DoctorDetail";

const App = ()=>{



  return(
    <div className="dark:bg-gray-800">
      <ToastContainer />
      <Header />
      


      <Routes className="">
        <Route path='/' element={<Home/>}/>
        <Route path="/booking" element={<Booking />}/>
        <Route path="/ai-chat" element={<Ai />}/>
        <Route path="/about-us" element={<About />}/>
        <Route path="/contact-us" element={<Contact />}/>
        <Route path="/auth0" element={<AuthPage />}/>
        <Route path="/create-profile" element={<Profile />}/>
        <Route path="/video-call" element={<VideoCall />}/>
        <Route path="/doctor-detail" element={<DoctorDetail />}/>
      </Routes>
    <div className="mt-5">
      
    </div>
     
     
      <div className="fixed w-full bottom-0 lg:hidden">
        <MenuBottom />

      </div>

      

      
       
    </div>

  )
}

export default App