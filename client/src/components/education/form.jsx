import React, { useState } from 'react';

export default function Educations({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Education</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="instituteName" className="block text-sm font-medium text-gray-700 mb-1">
            Institute Name
          </label>
          <input
            type="text"
            id="instituteName"
            name="instituteName"
            value={formData.instituteName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter Institute name"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter Location"
          />
        </div>

          <div>
          <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
            Degree Type
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Masters/Bachelors"
          />
        </div>

        <div>
          <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
            Field Of Study
          </label>
          <input
            type="text"
            id="field"
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Masters/Bachelors"
          />
        </div>

           <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="2/2/22"
          />
        </div>

                 <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="2/2/22"
          />
        </div>


          <div>
          <label htmlFor="scoreType" className="block text-sm font-medium text-gray-700 mb-1">
            Score Type
          </label>
          <input
            type="text"
            id="scoreType"
            name="scoreType"
            value={formData.scoreType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Masters/Bachelors"
          />
        </div>

                 <div>
          <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
            Score
          </label>
          <input
            type="number"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="3.3"
          />
        </div>

      </div>
    </div>
  );
}
