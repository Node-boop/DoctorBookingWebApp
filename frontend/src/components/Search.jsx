import React from 'react'

const Search = () => {
  return (
    <form className='flex flex-1 items-center justify-center'>
        <input type="search" role='search' placeholder='search by eg,location,clinic-name,proffesion' className='w-full px-5 py-2 cursor-pointer rounded-full border border-gray-300 outline-none text-slate-900 font-serif'/>
        <button type='submit' className='px-4 py-2 text-sm rounded-full border border-gray-300 bg-white text-slate-900 font-serif hover:bg-sky-700 hover:text-white'>search</button>


    </form>
  )
}

export default Search