import React, { useState } from 'react';

export default function Experience({ formData, setFormData }) {
  const [newExperience, setNewExperience] = useState({
    employer: '',
    jobTitle: '',
    jobLocation: '',
    jobStartDate: '',
    jobEndDate: '',
    currentlyWorking: false,
    jobDescription: ''
  });

  const handleAddExperience = () => {
    if (newExperience.employer.trim() && newExperience.jobTitle.trim()) {
      const experienceToAdd = {
        ...newExperience,
        jobEndDate: newExperience.currentlyWorking ? 'Present' : newExperience.jobEndDate
      };

      setFormData(prev => ({
        ...prev,
        experiences: [...(prev.experiences || []), experienceToAdd]
      }));
      
      // Reset form
      setNewExperience({
        employer: '',
        jobTitle: '',
        jobLocation: '',
        jobStartDate: '',
        jobEndDate: '',
        currentlyWorking: false,
        jobDescription: ''
      });
    }
  };

  const handleRemoveExperience = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences?.filter((_, index) => index !== indexToRemove) || []
    }));
  };

  const handleNewExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, idx) => 
        idx === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleToggleCurrentlyWorking = (index, checked) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, idx) => 
        idx === index 
          ? { 
              ...exp, 
              currentlyWorking: checked,
              jobEndDate: checked ? 'Present' : exp.jobEndDate 
            } 
          : exp
      )
    }));
  };

  const formatMonth = (monthString) => {
    if (!monthString || monthString === 'Present') return monthString;
    const [year, month] = monthString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Work Experience</h2>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Experience</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="employer" className="block text-sm font-medium text-gray-700 mb-1">
                Employer / Company *
              </label>
              <input
                type="text"
                id="employer"
                name="employer"
                value={newExperience.employer}
                onChange={handleNewExperienceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g., Google, Microsoft"
                required
              />
            </div>

            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={newExperience.jobTitle}
                onChange={handleNewExperienceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g., Software Engineer"
                required
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
                value={newExperience.jobLocation}
                onChange={handleNewExperienceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g., San Francisco, CA"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="jobStartDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="month"
                id="jobStartDate"
                name="jobStartDate"
                value={newExperience.jobStartDate}
                onChange={handleNewExperienceChange}
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
                value={newExperience.jobEndDate}
                onChange={handleNewExperienceChange}
                disabled={newExperience.currentlyWorking}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  newExperience.currentlyWorking ? 'bg-gray-100' : ''
                }`}
              />
            </div>
            
            <div className="flex items-end">
              <div className="flex items-center h-10">
                <input
                  type="checkbox"
                  id="currentlyWorking"
                  name="currentlyWorking"
                  checked={newExperience.currentlyWorking}
                  onChange={handleNewExperienceChange}
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
              value={newExperience.jobDescription}
              onChange={handleNewExperienceChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Describe your responsibilities, achievements, and key contributions..."
            />
            <p className="mt-1 text-sm text-gray-500">Use bullet points for better readability (use • or -)</p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleAddExperience}
              disabled={!newExperience.employer.trim() || !newExperience.jobTitle.trim()}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add Experience
            </button>
          </div>
        </div>
      </div>

      {/* List of Added Experiences */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Your Work Experience ({formData.experiences?.length || 0})
        </h3>
        
        {formData.experiences?.length > 0 ? (
          <div className="space-y-6">
            {formData.experiences.map((experience, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">{experience.jobTitle}</h4>
                        <p className="text-lg text-gray-700">{experience.employer}</p>
                        {experience.jobLocation && (
                          <p className="text-gray-600">{experience.jobLocation}</p>
                        )}
                      </div>
                      
                      <div className="mt-2 md:mt-0">
                        <div className="flex flex-col items-end">
                          <span className="text-gray-700">
                            {formatMonth(experience.jobStartDate)} - {formatMonth(experience.jobEndDate)}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            {calculateDuration(experience.jobStartDate, experience.jobEndDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={experience.employer}
                        onChange={(e) => handleEditExperience(index, 'employer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        value={experience.jobTitle}
                        onChange={(e) => handleEditExperience(index, 'jobTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Job Title"
                      />
                    </div>
                    
                    {experience.jobDescription && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-gray-700 whitespace-pre-line">
                          {experience.jobDescription.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-3 flex items-center">
                      <input
                        type="checkbox"
                        checked={experience.currentlyWorking || false}
                        onChange={(e) => handleToggleCurrentlyWorking(index, e.target.checked)}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-600">
                        Currently working here
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="ml-4 text-gray-400 hover:text-red-500 text-lg font-bold px-2 py-1 rounded-full hover:bg-red-50"
                    aria-label={`Remove ${experience.employer}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 italic">No work experience added yet. Add your first experience above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

