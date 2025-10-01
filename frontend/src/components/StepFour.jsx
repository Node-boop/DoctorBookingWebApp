import React from 'react'

const StepFour = () => {
  return (
    <form onSubmit={continueStep} className="space-y-4" id="stepTwo">
      <fieldset className="border-1 border-gray-400 px-5 py-5">
        <legend>Address Details</legend>

        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-700">
            County
          </label>
          <input
            type="text"
            onChange={handleChange("address")}
            defaultValue={values.address}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 outline-0 rounded-md"
            placeholder="county of residence"
          />
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700">
            Constituency
          </label>
          <input
            type="text"
            onChange={handleChange("city")}
            defaultValue={values.city}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 outline-none"
            required
            placeholder="your constituency"
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700">
            Ward
          </label>
          <input
            type="text"
            onChange={handleChange("city")}
            defaultValue={values.city}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 outline-none"
            required
            placeholder="ward...."
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            onChange={handleChange("city")}
            defaultValue={values.city}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 outline-none"
            required
            placeholder="Location...."
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700">
            Street/Estate:
          </label>
          <input
            type="text"
            onChange={handleChange("city")}
            defaultValue={values.city}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 outline-none"
            required
            placeholder="Street or Estate...."
          />
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
  )
}

export default StepFour