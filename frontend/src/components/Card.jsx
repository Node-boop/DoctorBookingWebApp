import React from 'react'
import doc_image from '../assets/doctor-banner.png' // Assuming you have a doctor image in your assets
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Adjust the import path as necessary
import { NavLink,Link } from 'react-router-dom';

const Card = (props) => {
    // You can pass props to customize the card if needed
    // For example, you can pass doctor details as props
    // const { name, rating, specialization, location, experience } = props;
    // For now, we'll use static data for demonstration

    const {navigate} = useContext(ShopContext);
  return (
    <div className="bg-white shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] rounded-lg p-4">
      <div className="flex flex-col items-center">
        <img src={doc_image} alt="Doctor" className="w-24 h-24 rounded-full mb-4" />
        <h3 className="text-lg font-semibold text-slate-900">Dr. John Doe</h3>
        <p className="text-sm text-slate-600">Rating: 4.5/5</p>
        <p className="text-sm text-slate-600">Specialization: Dentist</p>
        <p className="text-sm text-slate-600">Location: Nairobi</p>
        <p className="text-sm text-slate-600">Experience: 10 years</p>

       
        
        
        <NavLink to={{
            pathname: '/doctor-detail',
            search: `?id=69odien4992kj3j2i&name=Dr. John Doe&specialization=Dentist&location=Nairobi&experience=10 years`
        }}>
            <button onClick={() => navigate('/doctor-detail')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-2xl text-sm hover:bg-blue-600 transition-colors">
                View Profile
            </button>
        </NavLink>
        
      </div>
    </div>
  )
}

export default Card