import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Search = () => {
  const { handleSearch,searchQuery,setSearchQuery ,showSearch,setShowSearch} = useContext(ShopContext);
  return (
    <form onSubmit={(e) => handleSearch(searchQuery, e)} className={`flex items-center justify-center ${showSearch ? 'block' : 'hidden'}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for doctors"
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 "
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </form>
  )
}

export default Search