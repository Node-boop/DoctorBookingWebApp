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
          <input type="radio" name="title" id="" required/>
      </div>
      
       <div className='flex flex-col gap-1'>
          <label htmlFor="title">Mrs.</label>
          <input type="radio" name="title" id="" required/>
      </div>

       <div className='flex flex-col gap-1'>
          <label htmlFor="title">Miss.</label>
          <input type="radio" name="title" id="" required/>
      </div>
      </div>

      <div className='flex flex-col gap-3 mt-3'>
        <label htmlFor="phone">Phone:</label>

        <input type="tel" className="input validator tabular-nums" required placeholder="Phone" 
        pattern="[0-9]*" minlength="10" maxlength="10" title="Must be 10 digits" />
      </div>

      <div className='flex flex-col gap-3 mt-3'>

        <label htmlFor="DOB">Date Of Birth:</label>

        <input type="date" className="input validator" required placeholder="Pick a date in 2025" 
        min="1970-01-01" max="2025-01-01"
          title="Must be valid URL" />
       

      </div>

      <div className='hidden  flex-col gap-4 mt-4'>

        <label htmlFor="natinality">Natinality:</label>

        <select defaultValue="Pick a font" className="select select-ghost border">
        <option disabled={true}>Pick a country</option>
        <option>Inter</option>
        <option>Poppins</option>
        <option>Raleway</option>
      </select>

      </div>

      <div className='flex flex-col gap-4 mt-4' >

        <label htmlFor="ID">ID No:</label>

      <input type="tel" className="input validator tabular-nums" required placeholder="ID Number" 
        pattern="[0-9]*" minLength="7" maxLength="8" title="Must be 8 digits" />


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