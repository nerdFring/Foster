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
    address:'',
    languages: [],
    
    educations: [],
    
    experiences: [], 
    
    skills: [],
    
    projects: []
  });

  const handleSubmit = async() => {
    console.log('Form Data:', formData);
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'resume-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    try {
      const response= await fetch("http://localhost:3000/create",{
        method:"POST",
        headers:{
        "Content-Type": "application/json",
        },
        body:JSON.stringify(formData)
      })
      const result=await response.json()
          if (!result.ok) {
      throw new Error(result.message || "Failed to create resume");
    }

    console.log("Resume created:", result);
    alert("Resume created successfully ✅");

    } catch (error) {
          console.error("Error submitting resume:", error);
    alert("Error submitting resume ❌");

    }
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
        
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium text-lg"
          >
            Submit Resume
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Data Preview</h3>
          <pre className="text-sm text-gray-600 overflow-auto max-h-40">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;
