import React,{createContext, use, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext()



const ShopContextProvider = (props)=>{
     const [token,setToken] = useState('')
     const [showAccountMenu,setShowAccountMenu] = useState(false)
     const [showHeader,setShowHeader] = useState(true)
     const navigate = useNavigate()
     const backendUrl = 'http://localhost:5500'

    

    useEffect(()=>{
        if(!token)
        {
            setToken(localStorage.getItem('token'))
            
        }
    },[token])

    const value = {
        token,navigate,backendUrl,setToken,showAccountMenu,setShowAccountMenu
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider