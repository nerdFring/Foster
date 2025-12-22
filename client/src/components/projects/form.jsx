import React, { useState } from 'react';

export default function Projects({ formData, setFormData }) {
  const [newProject, setNewProject] = useState({
    projectName: '',
    technologies: '',
    link: '',
    description: ''
  });

  const handleAddProject = () => {
    if (newProject.projectName.trim()) {
      const technologiesArray = newProject.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech !== '');

      const projectToAdd = {
        ...newProject,
        technologies: technologiesArray
      };

      setFormData(prev => ({
        ...prev,
        projects: [...(prev.projects || []), projectToAdd]
      }));
      
      setNewProject({
        projectName: '',
        technologies: '',
        link: '',
        description: ''
      });
    }
  };

  const handleRemoveProject = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects?.filter((_, index) => index !== indexToRemove) || []
    }));
  };

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Projects</h2>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Project</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={newProject.projectName}
                onChange={handleNewProjectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g., E-commerce Website"
                required
              />
            </div>
            
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                Project Link
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={newProject.link}
                onChange={handleNewProjectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={newProject.technologies}
              onChange={handleNewProjectChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="React, Node.js, MongoDB (comma separated)"
            />
            <p className="mt-1 text-sm text-gray-500">Separate technologies with commas</p>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newProject.description}
              onChange={handleNewProjectChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Describe the project, your role, features, and accomplishments..."
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddProject}
              disabled={!newProject.projectName.trim()}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* List of Added Projects */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Your Projects ({formData.projects?.length || 0})
        </h3>
        
        {formData.projects?.length > 0 ? (
          <div className="space-y-6">
            {formData.projects.map((project, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{project.projectName}</h4>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 mt-1"
                      >
                        <span>🔗</span>
                        {project.link.length > 40 ? `${project.link.substring(0, 40)}...` : project.link}
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="text-gray-400 hover:text-red-500 text-lg font-bold px-2 py-1 rounded-full hover:bg-red-50"
                    aria-label={`Remove ${project.projectName}`}
                  >
                    ×
                  </button>
                </div>
                
                {project.technologies?.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {project.description && (
                  <div>
                    <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 italic">No projects added yet. Add your first project above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
