import React, { useState, useEffect } from 'react'
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa"
import { FaCirclePlus, FaChevronDown, FaChevronUp } from "react-icons/fa6"

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: "Is this resume builder really free?",
      answer: "Yes! Our resume builder is completely free with no hidden charges, no watermarks, and no subscription fees. You can create, download, and print as many resumes as you need without any cost.",
      category: "Pricing"
    },
    {
      question: "What file formats can I download my resume in?",
      answer: "You can download your resume in PDF, DOCX (Microsoft Word), and plain text formats. The PDF format is recommended for professional applications as it maintains formatting across all devices.",
      category: "Features"
    },
    {
      question: "Do I need to create an account to use the resume builder?",
      answer: "No account is required! You can start building your resume immediately without signing up. However, creating a free account allows you to save multiple resumes and access them from any device.",
      category: "Account"
    },
    {
      question: "Are there templates available?",
      answer: "Yes, we offer multiple professionally designed templates that are ATS-friendly (Applicant Tracking System compliant). You can switch between templates at any time without losing your content.",
      category: "Features"
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We do not share your personal information with third parties. Your resumes are stored securely, and you can delete your data at any time. We use encryption to protect all your information.",
      category: "Security"
    },
    {
      question: "Can I customize the sections of my resume?",
      answer: "Yes, our resume builder allows full customization. You can add, remove, or rearrange sections like Work Experience, Education, Skills, Projects, Certifications, and more to match your needs.",
      category: "Features"
    },
    {
      question: "How do I write effective bullet points for my experience?",
      answer: "Use action verbs, quantify achievements with numbers, and focus on results. Instead of 'Responsible for sales,' write 'Increased sales by 25% through strategic client outreach.' Our builder includes AI-powered suggestions to help improve your content.",
      category: "Tips"
    },
    {
      question: "Is the resume builder ATS-friendly?",
      answer: "Yes, all our templates are designed to be ATS-friendly with clean formatting, standard headings, and proper structure. We avoid using columns, graphics, or unusual fonts that might confuse applicant tracking systems.",
      category: "Features"
    },
    {
      question: "Can I create different versions of my resume?",
      answer: "Yes, you can create multiple versions of your resume for different job applications. With a free account, you can save unlimited resumes and tailor each one for specific roles or industries.",
      category: "Features"
    },
    {
      question: "How do I get help if I'm stuck?",
      answer: "We provide built-in tips and examples throughout the builder. You can also access our help center with detailed guides, or contact our support team directly from the 'Help' section in the app.",
      category: "Support"
    },
    {
      question: "What if I need a cover letter?",
      answer: "Our platform includes a free cover letter builder that matches your resume template. You can create professional cover letters using the same information from your resume for a consistent application package.",
      category: "Features"
    },
    {
      question: "Can I edit my resume after downloading it?",
      answer: "Yes, you can return to our platform anytime to edit and update your resume. Simply log into your account, make your changes, and download the updated version. Your previous downloads remain as-is unless you re-download.",
      category: "Editing"
    }
  ]

  // Filter FAQ items based on search query
  const filteredFaqItems = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems

  // Get unique categories
  const categories = [...new Set(faqItems.map(item => item.category))]
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter by category
  const categorizedFaqItems = activeCategory === 'All' 
    ? filteredFaqItems 
    : filteredFaqItems.filter(item => item.category === activeCategory)

  // Expand/Collapse all functionality
  const expandAll = () => {
    setActiveIndex(filteredFaqItems.map((_, index) => index))
  }

  const collapseAll = () => {
    setActiveIndex(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-bold text-center py-4 sm:py-6 text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            Everything you need to know about our resume builder
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 sm:mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-300 
                focus:border-gray-800 focus:ring-2 focus:ring-gray-200 
                transition-all duration-300 text-base sm:text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 
                  text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filters (Desktop) */}
          {!isMobile && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === 'All' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Category Dropdown */}
          {isMobile && (
            <div className="relative max-w-xs mx-auto">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white 
                  appearance-none focus:border-gray-800 focus:ring-2 focus:ring-gray-200"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          )}

          {/* Expand/Collapse Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={expandAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 
                hover:text-gray-800 transition-colors"
            >
              <FaPlusCircle className="text-gray-400" />
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 
                hover:text-gray-800 transition-colors"
            >
              <FaMinusCircle className="text-gray-400" />
              Collapse All
            </button>
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Found {filteredFaqItems.length} result{filteredFaqItems.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {categorizedFaqItems.length > 0 ? (
            categorizedFaqItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md 
                  transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <button
                  className="w-full cursor-pointer px-4 sm:px-6 py-4 sm:py-5 text-left 
                    flex justify-between items-center hover:bg-gray-50 
                    transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeIndex === index}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="hidden xs:inline-flex items-center justify-center 
                        w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 text-gray-600 
                        font-medium text-sm flex-shrink-0">
                        Q{index + 1}
                      </span>
                      <span className="text-base xs:text-lg sm:text-xl font-medium text-gray-900 
                        text-left pr-4">
                        {item.question}
                      </span>
                    </div>
                    {/* Category badge */}
                    <span className="inline-block mt-1 sm:mt-2 px-2 py-1 bg-gray-100 
                      text-gray-600 text-xs rounded">
                      {item.category}
                    </span>
                  </div>
                  <span className="ml-2 sm:ml-4 flex-shrink-0">
                    {activeIndex === index ? (
                      <FaMinusCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                    ) : (
                      <FaCirclePlus className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                    )}
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center 
                        w-6 h-6 rounded-full bg-gray-100 text-gray-600 
                        font-medium text-sm flex-shrink-0 mt-1">
                        A
                      </span>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                Try different search terms or browse all categories
              </p>
            </div>
          )}
        </div>

        {/* <div className="mt-8 sm:mt-12 bg-gradient-to-r from-gray-50 to-gray-100 
          rounded-xl p-6 sm:p-8 text-center border border-gray-200">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base max-w-xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-white font-medium px-6 py-3 sm:px-8 sm:py-4 
              rounded-full hover:bg-gray-800 hover:scale-[1.02] active:scale-95
              transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl
              text-base sm:text-lg">
              Contact Support
            </button>
            <button className="bg-white text-gray-900 font-medium px-6 py-3 sm:px-8 sm:py-4 
              rounded-full hover:bg-gray-50 border-2 border-gray-300
              transition-all duration-300 cursor-pointer shadow hover:shadow-md
              text-base sm:text-lg">
              Visit Help Center
            </button>
          </div>
          
        
        </div> */}

        {isMobile && (
          <div className="fixed bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg 
            p-4 border border-gray-200 z-10">
            <div className="flex justify-between items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-gray-700 text-sm"
              >
                <FaChevronUp />
                Back to top
              </button>
              <button
                onClick={expandAll}
                className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg"
              >
                Expand All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Faq
