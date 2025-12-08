import React, { useState } from 'react';

export default function Skills({ formData, setFormData }) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h2>
      
      <div className="mb-4">
        <label htmlFor="newSkill" className="block text-sm font-medium text-gray-700 mb-2">
          Add Skills
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="newSkill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g., JavaScript, React, Project Management"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Add
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">Press Enter or click Add to add a skill</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Your Skills ({formData.skills?.length || 0})</h3>
        
        {formData.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-300"
              >
                <span className="text-gray-800">{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 text-gray-500 hover:text-red-500 focus:outline-none"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No skills added yet. Add some skills above.</p>
        )}
      </div>
    </div>
  );
}