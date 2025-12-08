import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }


  const faqItems = [
    {
      question: "Is this resume builder really free?",
      answer: "Yes! Our resume builder is completely free with no hidden charges, no watermarks, and no subscription fees. You can create, download, and print as many resumes as you need without any cost."
    },
    {
      question: "What file formats can I download my resume in?",
      answer: "You can download your resume in PDF, DOCX (Microsoft Word), and plain text formats. The PDF format is recommended for professional applications as it maintains formatting across all devices."
    },
    {
      question: "Do I need to create an account to use the resume builder?",
      answer: "No account is required! You can start building your resume immediately without signing up. However, creating a free account allows you to save multiple resumes and access them from any device."
    },
    {
      question: "Are there templates available?",
      answer: "Yes, we offer multiple professionally designed templates that are ATS-friendly (Applicant Tracking System compliant). You can switch between templates at any time without losing your content."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We do not share your personal information with third parties. Your resumes are stored securely, and you can delete your data at any time. We use encryption to protect all your information."
    },
    {
      question: "Can I customize the sections of my resume?",
      answer: "Yes, our resume builder allows full customization. You can add, remove, or rearrange sections like Work Experience, Education, Skills, Projects, Certifications, and more to match your needs."
    },
    {
      question: "How do I write effective bullet points for my experience?",
      answer: "Use action verbs, quantify achievements with numbers, and focus on results. Instead of 'Responsible for sales,' write 'Increased sales by 25% through strategic client outreach.' Our builder includes AI-powered suggestions to help improve your content."
    },
    {
      question: "Is the resume builder ATS-friendly?",
      answer: "Yes, all our templates are designed to be ATS-friendly with clean formatting, standard headings, and proper structure. We avoid using columns, graphics, or unusual fonts that might confuse applicant tracking systems."
    },
    {
      question: "Can I create different versions of my resume?",
      answer: "Yes, you can create multiple versions of your resume for different job applications. With a free account, you can save unlimited resumes and tailor each one for specific roles or industries."
    },
    {
      question: "How do I get help if I'm stuck?",
      answer: "We provide built-in tips and examples throughout the builder. You can also access our help center with detailed guides, or contact our support team directly from the 'Help' section in the app."
    },
    {
      question: "What if I need a cover letter?",
      answer: "Our platform includes a free cover letter builder that matches your resume template. You can create professional cover letters using the same information from your resume for a consistent application package."
    },
    {
      question: "Can I edit my resume after downloading it?",
      answer: "Yes, you can return to our platform anytime to edit and update your resume. Simply log into your account, make your changes, and download the updated version. Your previous downloads remain as-is unless you re-download."
    }
  ]



  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-bold text-center py-6 text-4xl text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Find answers to common questions about React and Tailwind CSS
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full cursor-pointer px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                <span className="ml-6 flex-shrink-0">
                  {activeIndex === index ? (
                    <FaMinusCircle className="h-5 w-5 text-black" />
                  ) : (
                    <FaCirclePlus className="h-5 w-5 text-black" />
                  )}
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please reach out to our support team.
          </p>
                 
        <button className="bg-black text-white font-bold px-8 py-4 rounded-full 
          hover:bg-white hover:text-black hover:border-2 hover:border-black 
          transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
          Contact Support
        </button>
        </div>
      </div>
    </div>
  )
}

export default Faq

