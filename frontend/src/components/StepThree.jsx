// StepThree.js
import React from 'react';

const StepThree = ({ prevStep, values }) => {
  const { name, email, address, city } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send data to an API or perform other actions
    alert('Form Submitted Successfully!');
  };

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Confirm Details</h3>
      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-gray-700"><strong>Name:</strong> {name}</p>
        <p className="text-gray-700"><strong>Email:</strong> {email}</p>
        <p className="text-gray-700"><strong>Address:</strong> {address}</p>
        <p className="text-gray-700"><strong>City:</strong> {city}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={goBack}
          className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );
};

export default StepThree;