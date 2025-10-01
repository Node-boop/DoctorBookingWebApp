import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Search = () => {
  const { handleSearch,searchQuery,setSearchQuery ,showSearch,setShowSearch} = useContext(ShopContext);
  return (
    <form onSubmit={handleSearch} className={`flex items-center justify-center border border-gray-300 rounded-lg max-sm:w-[80%] ${showSearch ? 'block' : 'hidden'}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for doctors"
        className="w-full max-w-md px-4 py-2 rounded-lg outline-none  dark:text-white"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <i className="fa fa-search"></i>
      </button>
    </form>
  )
}

export default Search