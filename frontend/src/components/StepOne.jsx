// StepOne.js
import React from 'react';

const StepOne = ({ nextStep, handleChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-6 shadow">
     <fieldset className='border-1 border-gray-400 px-5 py-5'>
      <legend>Personal Details</legend>

      <div className='flex gap-8 mt-3'>
      <div className='flex flex-col gap-1'>
          <label htmlFor="title">Mr.</label>
          <input type="radio" name="title" id="" />
      </div>
      
       <div className='flex flex-col gap-1'>
          <label htmlFor="title">Mrs.</label>
          <input type="radio" name="title" id="" />
      </div>

       <div className='flex flex-col gap-1'>
          <label htmlFor="title">Miss.</label>
          <input type="radio" name="title" id="" />
      </div>
      </div>

      <div className='flex flex-col gap-3 mt-3'>
        <label htmlFor="phone">Phone:</label>

        <input type="tel" name="phone" id="" className='border-b border-gray-300 outline-none' placeholder='eg.25471234567' required/>
      </div>

      <div className='flex flex-col gap-3 mt-3'>

        <label htmlFor="DOB">Date Of Birth:</label>

        <input type="date" name="DOB" id="dateOfBirth" defaultValue={new Date} className='border-b-1 border-gray-300 outline-none' required placeholder='Date of Birth'/>

      </div>

      <div className='flex flex-col gap-4 mt-4'>

        <label htmlFor="natinality">Natinality:</label>

        <select name="country" id="" className='border-b-2 border-gray-300 outline-none' required>
          <option value="">Nationality</option>
          <option value="Algeria">Algeria</option>
          <option value="Angola">Angola</option>
          <option value="Congo">Congo</option>
          <option value="Ghana">Ghana</option>
          <option value="Kenya">Kenya</option>
        </select>

      </div>

      <div className='flex flex-col gap-4 mt-4' >

        <label htmlFor="ID">ID / Passport:</label>

        <input type="text" name="ID" id="" className='border-b-2 border-gray-400 outline-none' placeholder='ID or Passport Number' required/>


      </div>


      <div className='mt-4'>
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

export default StepOne;