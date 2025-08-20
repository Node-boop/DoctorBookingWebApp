import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const DoctorContext = createContext()


const DoctorContextProvider = (props)=>{
    const [token,setToken] = useState('')
    const backendURL = 'http://localhost:5500'
    const naigate  = useNavigate()
    const [showSidebar,setShowSidebar] = useState(true)


    useEffect(()=>{
        if(!token)
        {
            setToken(localStorage.getItem('token'))
        }
    },[token])




    const values = {backendURL,token,setToken,naigate,showSidebar,setShowSidebar}



    return(
        <DoctorContext.Provider value={values}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider