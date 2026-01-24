import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Globe, Calendar, Briefcase, GraduationCap, Code, Folder, Download } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: '3pt solid black',
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    marginTop: 5,
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 3,
  },
  languages: {
    fontSize: 9,
    marginTop: 5,
  },
  section: {
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    borderBottom: '1.5pt solid #666',
    paddingBottom: 5,
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 12,
    marginLeft: 5,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  employer: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#333',
    marginBottom: 2,
  },
  dateLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    color: '#555',
    marginBottom: 5,
  },
  location: {
    fontSize: 9,
    color: '#555',
    marginBottom: 5,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#333',
  },
  educationItem: {
    marginBottom: 10,
    marginLeft: 5,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  institution: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#333',
    marginBottom: 2,
  },
  eduDetails: {
    flexDirection: 'row',
    fontSize: 9,
    color: '#555',
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 12,
    marginLeft: 5,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
  },
  technologies: {
    fontSize: 9,
    marginBottom: 5,
    color: '#333',
  },
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#333',
  },
  skills: {
    fontSize: 9,
    lineHeight: 1.6,
    marginLeft: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 7,
    color: '#999',
    borderTop: '0.5pt solid #ccc',
    paddingTop: 8,
  },
});

// PDF Document Component
const ResumePDF = ({ data }) => {
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
    
    if (years === 0 && remainingMonths === 0) return '(1 mo)';
    if (years === 0) return `(${remainingMonths} mo)`;
    if (remainingMonths === 0) return `(${years} yr)`;
    return `(${years} yr ${remainingMonths} mo)`;
  };

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>
            {data.firstName} {data.lastName}
          </Text>
          <View style={pdfStyles.contactInfo}>
            {data.email && <Text style={pdfStyles.contactItem}>✉ {data.email}</Text>}
            {data.phone && <Text style={pdfStyles.contactItem}>☎ {data.phone}</Text>}
            {data.address && <Text style={pdfStyles.contactItem}>📍 {data.address}</Text>}
          </View>
          {data.languages && data.languages.length > 0 && (
            <View style={pdfStyles.languages}>
              <Text>
                Languages: {Array.isArray(data.languages) ? data.languages.join(', ') : data.languages}
              </Text>
            </View>
          )}
        </View>

        {/* Professional Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={pdfStyles.experienceItem}>
                <Text style={pdfStyles.jobTitle}>{exp.jobTitle}</Text>
                <Text style={pdfStyles.employer}>{exp.employer}</Text>
                <View style={pdfStyles.dateLocation}>
                  <Text>
                    {formatDate(exp.jobStartDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.jobEndDate)} {calculateDuration(exp.jobStartDate, exp.currentlyWorking ? null : exp.jobEndDate)}
                  </Text>
                </View>
                {exp.jobLocation && (
                  <Text style={pdfStyles.location}>📍 {exp.jobLocation}</Text>
                )}
                {exp.jobDescription && (
                  <Text style={pdfStyles.description}>{exp.jobDescription}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={pdfStyles.educationItem}>
                <Text style={pdfStyles.degree}>
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                </Text>
                <Text style={pdfStyles.institution}>{edu.instituteName}</Text>
                <View style={pdfStyles.eduDetails}>
                  {edu.location && <Text style={{ marginRight: 15 }}>📍 {edu.location}</Text>}
                  <Text>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                  {edu.score && edu.scoreType && (
                    <Text style={{ marginLeft: 15 }}>
                      {edu.scoreType}: {edu.score}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={pdfStyles.projectItem}>
                <Text style={pdfStyles.projectName}>{project.projectName}</Text>
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={pdfStyles.technologies}>
                    Technologies: {project.technologies.join(' • ')}
                  </Text>
                )}
                {project.link && (
                  <Text style={{ fontSize: 8, color: '#0066cc', marginBottom: 3 }}>
                    🔗 {project.link}
                  </Text>
                )}
                {project.description && (
                  <Text style={pdfStyles.projectDescription}>{project.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Technical Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Technical Skills</Text>
            <Text style={pdfStyles.skills}>
              {data.skills.map(skill => {
                if (typeof skill === 'string') return skill;
                if (typeof skill === 'object' && skill.name) return skill.name;
                return '';
              }).filter(Boolean).join(' • ')}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={pdfStyles.footer} fixed>
          <Text>ATS-Friendly Resume - Text-based PDF for optimal parsing</Text>
        </View>
      </Page>
    </Document>
  );
};

// Main Component
const ATSResume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getResumeIdFromURL = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const resumeId = getResumeIdFromURL();
        
        const response = await fetch(`http://localhost:3000/get/${resumeId}`, {
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
          <PDFDownloadLink
            document={<ResumePDF data={resumeData} />}
            fileName={`${resumeData.firstName}_${resumeData.lastName}_Resume.pdf`}
            className="bg-black text-white font-bold px-8 py-4 rounded-full my-3 hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            {({ loading }) => (
              <>
                <Download size={20} />
                {loading ? 'Preparing PDF...' : 'Download Resume'}
              </>
            )}
          </PDFDownloadLink>
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


