import { useState } from "react";
import PersonalInfo from "./personalInfo/form";
import Educations from "./education/form";
import Experience from "./experience/form";
import Skills from "./skills/form";
import Projects from "./projects/form"; 

function ResumeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    instituteName: '',
    location: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
    scoreType: "gpa",
    field: '',
    scores: 0,
    employer: '',
    jobTitle: '',
    jobLocation: '',
    jobStartDate: '',
    jobEndDate: '',
    currentlyWorking: false,
    jobDescription: '',
    skills: [],
    projects: []
  });

  const handleSubmit = () => {
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Resume Builder</h1>
        
        <PersonalInfo formData={formData} setFormData={setFormData} />
        <Educations formData={formData} setFormData={setFormData} />
        <Experience formData={formData} setFormData={setFormData} />
        <Skills formData={formData} setFormData={setFormData} />
        <Projects formData={formData} setFormData={setFormData} />
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Submit Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;
