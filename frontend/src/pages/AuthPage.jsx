import React, { useContext, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
const AuthPage = () => {
  const {backendUrl,navigate,token,setToken} = useContext(ShopContext)
  const [currentState,setCurrentState] = useState('Login')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [gender,setGender] = useState('')

  const [repeatPassword,setRepeatPassword] = useState('')

  const handleGenderChange = (e)=>{

    setGender(e.target.value)

  }

  const onSubmitHandler = async(e)=>{
    try {
      e.preventDefault();

      switch (currentState) {
        case 'Login':
          const response = await axios.post(backendUrl + '/api/user/auth',{email,password},{headers:{
            "Content-Type":"application/json"
          }})

          if(response.data.success)
          {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
            toast.success('Login Success')
            navigate('/')
          }
          else{
            toast.error(response.data.message)
            navigate('/auth0')
            setCurrentState('Login')
          }

          
          break;
        case 'Signup':
          if (password !== repeatPassword)
            toast.error("Passwords do not match")
          const resp = await axios.post(backendUrl + '/api/user/register',{firstName,lastName,gender,email,password})
          if(resp.data.success){
            toast.success(resp.data.message)
            setToken(resp.data.token)
            navigate('/profile')
          }
          else
          {
            toast.error(resp.data.message)
          }

          break;


      
        default:
          break;
      }



    } catch (error) {
      toast.error(error.message)
      
    }
  }
  return (
    <div className='flex flex-col items-center justify-center justify-self-center mb-15'>

      
      <div className='max-w-[500px] border- px-5 py-3 mt-5 border-gray-300 bg-white shadow mb-10'>

        <p className='authHeading'>Meddicure Authentication</p>

        {
          currentState === 'Login' ? <div className='flex gap-6 items-center justify-center'>

        
          
           <p onClick={()=>setCurrentState('Login')} className={`text-center cursor-pointer text-white text-sm font-mono bg-sky-700 rounded-full shadow px-5 py-1`}>Login</p>
           <p onClick={()=>setCurrentState('Signup')} className={`text-center text-slate-700 text-sm font-mono bg-white cursor-pointer rounded-full shadow px-5 py-1`}>Signup</p>
        
        
        </div> : 
        ''
        }

        {
          currentState === 'Signup' ? <div className='flex gap-6 items-center justify-center'>

        
          
           <p onClick={()=>setCurrentState('Login')} className={`text-center text-slate-700 text-sm font-mono bg-white cursor-pointer rounded-full shadow px-5 py-1`}>Login</p>
           <p onClick={()=>setCurrentState('Signup')} className={`text-center text-sm font-mono bg-sky-700 text-white cursor-pointer rounded-full shadow px-5 py-1`}>Signup</p>
        
        
        </div> : 
        ''
        }


        
        
        <form onSubmit={onSubmitHandler} className='mt-5'>
          {
            currentState === 'Login' ? '' : <div className={`flex flex-col gap-2 mb-3`}>
            
            <p className='font-serif text-slate-600' >First Name:</p>
            <input onChange={(e)=>setFirstName(e.target.value)} value={firstName} className='px-5 py-2 text-slate-700 font-serif border border-gray-300 rounded-md shadow outline-none' type="text"  placeholder='First Name' required/>

          </div>
          }

          {
            currentState === 'Login' ? '' : <div className={`flex flex-col gap-2 mb-3`}>
            
            <p className='font-serif text-slate-600' >Last Name:</p>
            <input onChange={(e)=>setLastName(e.target.value)} value={lastName} className='px-5 py-2 text-slate-700 font-serif border border-gray-300 rounded-md shadow outline-none' type="text"  placeholder='Last Name' required/>

          </div>
          }
          

           <div className='flex flex-col mb-3'>
            
            <p className='font-serif text-slate-600' >Email:</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='px-5 py-2 text-slate-700 font-serif border border-gray-300 rounded-md shadow outline-none' type="email" placeholder='example@email.com' required/>
            
          </div>

           <div className='flex flex-col mb-3'>
            
            <p className='font-serif text-slate-600'>Password:</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='px-5 py-2 text-slate-700 font-serif border border-gray-300 rounded-md shadow outline-none' type="password"  placeholder='password' required/>
            
          </div>

          {
            currentState === 'Login' ? ' ' : 

             <div className={`flex flex-col mb-3 `}>
            
            <p className='font-serif text-slate-600' >Confirm Password:</p>
            <input onChange={(e)=>setRepeatPassword(e.target.value)} value={repeatPassword} className='px-5 py-2 text-slate-700 font-serif border border-gray-300 rounded-md shadow outline-none' type="password" placeholder='confirm password' required/>
            
          </div>
          }

          

          {
            currentState === 'Login' ? ' ' : 

            <div className="flex flex-col gap-2 mb-3">
            <p className="font-serif text-sm text-slate-500">Gender</p>

              <div className="flex gap-6">
                <div className="flex gap-1">
                  <p className="text-sm font-serif text-slate-500">Male</p>
                   <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
                  
                </div>

                <div className="flex gap-1">
                  <p className="text-sm font-serif text-slate-500">Female</p>
                   <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
                  
                </div>

                <div className="flex gap-1">
                  <p className="text-sm font-serif text-slate-500">Other</p>
                   <input type="radio" name="gender" value="other" checked={gender === 'other'} onChange={handleGenderChange} />
                  
                </div>
               


            
              </div>

            
          </div>
          }

          

          <div>
            {
              currentState === 'Login' ? <button type='submit' className='text-sm text-white cursor-pointer bg-sky-700 rounded-full w-full py-2 font-mono '>{currentState}</button> : ''
            }

            {
              currentState === 'Signup' ? <button type='submit' className='text-sm text-white cursor-pointer bg-sky-700 rounded-full w-full py-2 font-mono'>{currentState}</button> : ''
            }
          </div>

          <div className={`flex justify-between mt-2 cursor-pointer ${currentState === 'Signup' ? 'hidden' : 'block'}`}>
            <p className='text-sky-600 text-sm font-light font-serif hover:underline'>Forgot Password?</p>

            <div className='flex gap-1'>
              <input type='checkbox' />
              <p className='text-sm font-serif'>Remember me</p>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AuthPage