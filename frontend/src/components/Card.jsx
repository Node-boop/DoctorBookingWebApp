import React from 'react'
import doc_image from '../assets/doctor-banner.png' // Assuming you have a doctor image in your assets
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Adjust the import path as necessary
import { NavLink,Link } from 'react-router-dom';

const Card = ({firtName,lastName,image}) => {
    // You can pass props to customize the card if needed
    // For example, you can pass doctor details as props
    // const { name, rating, specialization, location, experience } = props;
    // For now, we'll use static data for demonstration

    const {navigate} = useContext(ShopContext);
  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 dark:bg-slate-950 dark:text-white">
      <div className="flex flex-col items-center">
       <div className="avatar">
          <div className="ring-normal ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
            <img src={image} />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Dr. {firtName} {lastName}</h3>
        <div className="">
             <div className="rating">
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" defaultChecked />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
        </div>
            
        </div>
       
        <p className="text-sm text-slate-600">Specialization: Dentist</p>
        <p className="text-sm text-slate-600">Location: Nairobi</p>
        <p className="text-sm text-slate-600">Experience: 10 years</p>

       
        
        
        <NavLink to={{
            pathname: '/doctor-detail',
            search: `?id=69odien4992kj3j2i&name=Dr. John Doe&specialization=Dentist&location=Nairobi&experience=10 years`
        }}>
            <button onClick={() => navigate('/doctor-detail')} className="mt-4 bg-primary text-white px-4 py-2 rounded-2xl text-sm hover:bg-blue-600 transition-colors">
                View Profile
            </button>
        </NavLink>
        
      </div>
    </div>
  )
}

export default Card