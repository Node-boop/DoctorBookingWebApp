import React,{useState} from 'react'

const Contact = () => {

  const [theme,setTheme] = useState('')


  const handleThemeChange = (e)=>{
    setTheme(e.target.value)
  }


  const toggle = (theme)=>{
    document.documentElement.classList.toggle('dark')
  }


  return (
    <div className='w-full min-h-screen dark:text-white'>
      <label className="flex cursor-pointer gap-2">
  <span className="label-text">Dark</span>
  <input type="checkbox" value="" className="toggle theme-controller" onChange = {toggle} />
  <span className="label-text">Light</span>
  </label>


    <button onClick={toggle} className="btn btn-primary">toggle</button>

    </div>
  )
}

export default Contact