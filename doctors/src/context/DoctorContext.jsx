import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const DoctorContext = createContext()


const DoctorContextProvider = (props)=>{
    const [token,setToken] = useState('')
    const backendURL = 'http://localhost:5500'
    const navigate  = useNavigate()
    const [showSidebar,setShowSidebar] = useState(false)
    const [currentPage,setCurrentPage] = useState('')


    useEffect(()=>{
        if(!token)
        {
            setToken(localStorage.getItem('token'))
        }
    },[token])




    const values = {backendURL,token,setToken,navigate,showSidebar,setShowSidebar,currentPage,setCurrentPage}



    return(
        <DoctorContext.Provider value={values}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider