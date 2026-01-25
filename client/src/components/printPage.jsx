import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Globe, Calendar, Briefcase, GraduationCap, Code, Folder, Download } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ATSResume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const {id}=useParams()

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`http://localhost:3000/get/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }

        const result = await response.json();
        console.log('Fetched resume data:', result);
        
        if (result.success && result.data) {
          setResumeData(result.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching resume:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  // Download PDF using Puppeteer backend
  const downloadPDF = async () => {
    try {
      setDownloadingPDF(true);
      
      const response = await fetch(`http://localhost:3000/generate-pdf/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Get the PDF blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.firstName}_${resumeData.lastName}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloadingPDF(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0 && remainingMonths === 0) return '1 mo';
    if (years === 0) return `${remainingMonths} mo`;
    if (remainingMonths === 0) return `${years} yr`;
    return `${years} yr ${remainingMonths} mo`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-center mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Error Loading Resume</h2>
            <p className="text-gray-600">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No resume data found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end bg-gray-50 px-4">
        {resumeData && (
          <button
            onClick={downloadPDF}
            disabled={downloadingPDF}
            className="bg-black text-white font-bold px-8 py-4 rounded-full my-3 hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={20} />
            {downloadingPDF ? 'Generating PDF...' : 'Download Resume'}
          </button>
        )}
      </div>

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg">
          <div className="border-b-4 border-black p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {resumeData.firstName} {resumeData.lastName}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-4">
              {resumeData.email && (
                <div className="flex items-center gap-1">
                  <Mail size={16} />
                  <span>{resumeData.email}</span>
                </div>
              )}
              {resumeData.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={16} />
                  <span>{resumeData.phone}</span>
                </div>
              )}
              {resumeData.address && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{resumeData.address}</span>
                </div>
              )}
            </div>

            {resumeData.languages && resumeData.languages.length > 0 && (
              <div className="mt-3 text-sm text-gray-700">
                <span className="font-semibold">Languages:</span> {Array.isArray(resumeData.languages) ? resumeData.languages.join(', ') : resumeData.languages}
              </div>
            )}
          </div>

          <div className="p-8">
            {resumeData.experience && resumeData.experience.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-300">
                  <Briefcase size={20} className="text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900 uppercase">Professional Experience</h2>
                </div>
                
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="ml-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h3>
                          <p className="text-base font-semibold text-gray-700">{exp.employer}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div className="flex items-center gap-1 justify-end">
                            <Calendar size={14} />
                            <span>{formatDate(exp.jobStartDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.jobEndDate)}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {calculateDuration(exp.jobStartDate, exp.currentlyWorking ? null : exp.jobEndDate)}
                          </p>
                        </div>
                      </div>
                      {exp.jobLocation && (
                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.jobLocation}
                        </p>
                      )}
                      {exp.jobDescription && (
                        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                          {exp.jobDescription}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resumeData.education && resumeData.education.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-300">
                  <GraduationCap size={20} className="text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900 uppercase">Education</h2>
                </div>
                
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="ml-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {edu.degree}{edu.field && ` in ${edu.field}`}
                          </h3>
                          <p className="text-base font-semibold text-gray-700">{edu.instituteName}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div className="flex items-center gap-1 justify-end">
                            <Calendar size={14} />
                            <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        {edu.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {edu.location}
                          </span>
                        )}
                        {edu.score && edu.scoreType && (
                          <span className="font-semibold">
                            {edu.scoreType}: {edu.score}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resumeData.projects && resumeData.projects.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-300">
                  <Folder size={20} className="text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900 uppercase">Projects</h2>
                </div>
                
                <div className="space-y-5">
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="ml-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{project.projectName}</h3>
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <Globe size={14} />
                            View
                          </a>
                        )}
                      </div>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-2">
                          <span className="text-sm font-semibold text-gray-700">Technologies: </span>
                          <span className="text-sm text-gray-600">
                            {project.technologies.join(' • ')}
                          </span>
                        </div>
                      )}
                      {project.description && (
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resumeData.skills && resumeData.skills.length > 0 && (
              <section className="mb-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-300">
                  <Code size={20} className="text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900 uppercase">Technical Skills</h2>
                </div>
                
                <div className="ml-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {resumeData.skills.map(skill => {
                      if (typeof skill === 'string') return skill;
                      if (typeof skill === 'object' && skill.name) return skill.name;
                      return '';
                    }).filter(Boolean).join(' • ')}
                  </p>
                </div>
              </section>
            )}
          </div>

          <div className="bg-gray-100 p-4 text-center text-xs text-gray-600 border-t">
            This is an ATS-friendly resume template. Click "Download Resume" above for a text-based PDF.
          </div>
        </div>
      </div>
    </>
  );
};

export default ATSResume;
