// MultiStepForm.js
import React, { useState } from 'react';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import StepFour from '../components/StepFour';

const Profile = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne nextStep={nextStep} handleChange={handleChange} values={formData} />;
      case 2:
        return <StepTwo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
      
      case 3:
        return <StepFour nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;

      case 4:
        return <StepThree prevStep={prevStep} values={formData} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center">Complete Your Profile</h2>
        {
          step === 1 ? <ul className="steps steps-vertical lg:steps-horizontal">
          <li className="step step-primary">Personal Details</li>
          <li className="step">Address</li>
          <li className="step">Medical Information</li>
          <li className="step">Summary</li>
        </ul> : ''
        }

        {
          step === 2 ? <ul className="steps steps-vertical lg:steps-horizontal">
          <li className="step step-success">Personal Details</li>
          <li className="step step-primary">Address</li>
          <li className="step">Medical information</li>
          <li className="step">Summary</li>
        </ul> : ''
        }

        {
          step === 3 ? <ul className="steps steps-vertical lg:steps-horizontal">
          <li className="step step-success">Personal Details</li>
          <li className="step step-success">Choose plan</li>
          <li className="step step-primary">Purchase</li>
          <li className="step">Receive Product</li>
        </ul> : ''
        }


       
        {renderStep()}
      </div>
    </div>
  );
};

export default Profile;