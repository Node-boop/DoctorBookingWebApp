import React from 'react'

const NewsLetter = () => {
  return (
    <div className='bg-amber-100 shadow p-6'>
        <p className='font-serif text-center text-gray-400 mb-3'>Subscribe to our Newsletter</p>
        <form className='flex flex-1 items-center justify-center '>
            <input className='px-5 py-2.5 w-full max-w-[500px] text-center cursor-pointer text-gray-400 border border-gray-300 outline-none' type="email" role='search' placeholder='enter your email' />
            <button className='bg-red-400 text-white p-2.5'>subscribe</button>
        </form>

    </div>
  )
}

export default NewsLetter