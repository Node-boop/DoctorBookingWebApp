import React,{createContext, use, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext()



const ShopContextProvider = (props)=>{
     const [token,setToken] = useState('')
     const [showAccountMenu,setShowAccountMenu] = useState(false)
     const [showHeader,setShowHeader] = useState(true)
     const [searchQuery,setSearchQuery] = useState('')
     const [searchResults,setSearchResults] = useState([])
     const [searchLoading,setSearchLoading] = useState(false)
     const [doctors,setDoctors] = useState([])
     const navigate = useNavigate()
     const [verified,setVerified]= useState(false)
     const [showSearch,setShowSearch] = useState(true)
     const backendUrl = 'http://localhost:5500'

    

    useEffect(()=>{
        if(!token)
        {
            setToken(localStorage.getItem('token'))
            
        }
    },[token])

    


    const handleSearch = async (searchQuery,e) => {
        try {
            e.preventDefault();
            setSearchLoading(true);
            const response = await fetch(`${backendUrl}/api/doctors/search?query=${searchQuery}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
                toast.error(response.data.message);
            }

            const data = await response.data.doctors;
            setSearchResults(data);

        }
        catch (error) {
            console.error('Error fetching search results:', error.message);
            toast.error('Failed to fetch search results. Please try again later.');
            setSearchResults([]);
        } finally {
            setSearchLoading(false);
        }

    };

    const userStatus = async()=>{
       try {
        const response = await axios.get(backendUrl + '/api/users/verification/status',{header:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`
        }})

        if(response.data.success)
        {
            setVerified(response.data.isVerified)
        }else
        {
            toast.error(response.data.message)
            navigate("/verify")
        }

       } catch (error) {
            toast.error(response.data.message)

        
       }
    }
    const fetchDoctors = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/doctors/list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const data = await response.data.doctors;
            setDoctors(data);

        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };
    const value = {
        token,navigate,backendUrl,setToken,showAccountMenu,setShowAccountMenu,handleSearch,searchQuery,setSearchQuery,searchResults,setSearchResults,searchLoading,setSearchLoading,doctors,setDoctors,fetchDoctors,showHeader,setShowHeader,showSearch,setShowSearch
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider