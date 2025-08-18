// StepTwo.js
import React from 'react';

const StepTwo = ({ nextStep, prevStep, handleChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-4">
     <fieldset className='border-1 border-gray-400 px-5 py-5'>
      <legend>Address Details</legend>

       <div className='mt-5'>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          onChange={handleChange('address')}
          defaultValue={values.address}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          onChange={handleChange('city')}
          defaultValue={values.city}
          className="block w-full px-3 py-2 mt-1 border-b-2 border-gray-300 outline-none"
        required placeholder='e,g Nairobi,Nakuru'/>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={goBack}
          className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
     </fieldset>
    </form>
  );
};

export default StepTwo;