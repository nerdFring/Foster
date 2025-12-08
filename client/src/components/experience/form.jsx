import React from 'react';

export default function Experience({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Work Experience</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="employer" className="block text-sm font-medium text-gray-700 mb-1">
            Employer / Company
          </label>
          <input
            type="text"
            id="employer"
            name="employer"
            value={formData.employer || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g., Google, Microsoft"
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g., Software Engineer"
          />
        </div>

        <div>
          <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Job Location
          </label>
          <input
            type="text"
            id="jobLocation"
            name="jobLocation"
            value={formData.jobLocation || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g., San Francisco, CA"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="jobStartDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="month"
            id="jobStartDate"
            name="jobStartDate"
            value={formData.jobStartDate || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="jobEndDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="month"
            id="jobEndDate"
            name="jobEndDate"
            value={formData.jobEndDate || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="currentlyWorking"
              name="currentlyWorking"
              checked={formData.currentlyWorking || false}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  currentlyWorking: e.target.checked,
                  jobEndDate: e.target.checked ? 'Present' : ''
                }));
              }}
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label htmlFor="currentlyWorking" className="ml-2 text-sm text-gray-600">
              Currently working here
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          value={formData.jobDescription || ''}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Describe your responsibilities, achievements, and key contributions..."
        />
      </div>
    </div>
  );
}