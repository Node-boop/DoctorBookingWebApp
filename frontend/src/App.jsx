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

const App = ()=>{
  return(
    <div>
      <ToastContainer />
      <Header />
      


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/booking" element={<Booking />}/>
        <Route path="/ai-chat" element={<Ai />}/>
        <Route path="/about-us" element={<About />}/>
        <Route path="/contact-us" element={<Contact />}/>
        <Route path="/auth0" element={<AuthPage />}/>
      </Routes>
    <div className="mt-5">
      
    </div>
     
     
      <div className="fixed w-full bottom-5 lg:hidden">
        <MenuBottom />

      </div>

      

       <div className="fixed w-full bottom-5 lg:hidden">
        <MenuBottom />

      </div>
       
    </div>

  )
}

export default App