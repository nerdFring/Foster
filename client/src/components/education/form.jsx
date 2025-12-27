import React, { useState } from 'react';

export default function Educations({ formData, setFormData }) {
  const [newEducation, setNewEducation] = useState({
    instituteName: '',
    location: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    scoreType: '',
    score: ''
  });

  const handleAddEducation = () => {
    if (newEducation.instituteName.trim() && newEducation.degree.trim()) {
      setFormData(prev => ({
        ...prev,
        educations: [...(prev.educations || []), newEducation]
      }));
      
      setNewEducation({
        instituteName: '',
        location: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        scoreType: '',
        score: ''
      });
    }
  };

  const handleRemoveEducation = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations?.filter((_, index) => index !== indexToRemove) || []
    }));
  };

  const handleNewEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditEducation = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations.map((edu, idx) => 
        idx === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Education</h2>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Education</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="instituteName" className="block text-sm font-medium text-gray-700 mb-1">
                Institute Name *
              </label>
              <input
                type="text"
                id="instituteName"
                name="instituteName"
                value={newEducation.instituteName}
                onChange={handleNewEducationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="University of Technology"
                required
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
                value={newEducation.location}
                onChange={handleNewEducationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                Degree Type *
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={newEducation.degree}
                onChange={handleNewEducationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Bachelor's, Master's, PhD"
                required
              />
            </div>

            <div>
              <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                id="field"
                name="field"
                value={newEducation.field}
                onChange={handleNewEducationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Computer Science, Business Administration"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={newEducation.startDate}
                onChange={handleNewEducationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                value={newEducation.endDate}
                onChange={handleNewEducationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="scoreType" className="block text-sm font-medium text-gray-700 mb-1">
                Score Type
              </label>
              <select
                id="scoreType"
                name="scoreType"
                value={newEducation.scoreType}
                onChange={handleNewEducationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Type</option>
                <option value="GPA">GPA</option>
                <option value="Percentage">Percentage</option>
                <option value="CGPA">CGPA</option>
                <option value="Grade">Grade</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
                Score
              </label>
              <input
                type="number"
                id="score"
                name="score"
                value={newEducation.score}
                onChange={handleNewEducationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="3.8"
                step="0.1"
                min="0"
                max="10"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleAddEducation}
              disabled={!newEducation.instituteName.trim() || !newEducation.degree.trim()}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add Education
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Your Education History ({formData.educations?.length || 0})
        </h3>
        
        {formData.educations?.length > 0 ? (
          <div className="space-y-6">
            {formData.educations.map((education, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">
                          {education.degree}
                          {education.field && <span> in {education.field}</span>}
                        </h4>
                        <p className="text-lg text-gray-700">{education.instituteName}</p>
                        {education.location && (
                          <p className="text-gray-600">{education.location}</p>
                        )}
                      </div>
                      
                      <div className="mt-2 md:mt-0">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">
                            {formatDate(education.startDate)} - {education.endDate ? formatDate(education.endDate) : 'Present'}
                          </span>
                          {education.score && education.scoreType && (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {education.score} {education.scoreType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={education.instituteName}
                        onChange={(e) => handleEditEducation(index, 'instituteName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Institute Name"
                      />
                      <input
                        type="text"
                        value={education.degree}
                        onChange={(e) => handleEditEducation(index, 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Degree"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="ml-4 text-gray-400 hover:text-red-500 text-lg font-bold px-2 py-1 rounded-full hover:bg-red-50"
                    aria-label={`Remove ${education.instituteName}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 italic">No education entries added yet. Add your first education above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

