import React from 'react'
import img1 from '../assets/algo1.png'
import img2 from '../assets/algo2.png'
import img3 from '../assets/algo3.png'
import img4 from '../assets/algo4.png'

function AiTutor() {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12 lg:mb-16">
        <h1 className="font-bold text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
          We are beyond a resume builder...
        </h1>
        <h2 className="font-bold text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Upgrade Your Skills With Latest IT Professionals Courses
        </h2>
        
        {/* Optional Subtitle */}
        <p className="text-gray-600 mt-6 md:mt-8 text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
          Master in-demand skills with our comprehensive course catalog designed for modern IT professionals
        </p>
      </div>

      {/* Image Grid Section */}
      <div className="max-w-7xl mx-auto">
        {/* First Row - Responsive Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="w-full lg:w-2/3">
            <img 
              src={img1} 
              alt="AI Tutor Course Preview 1" 
              className="w-full h-auto rounded-3xl lg:rounded-4xl shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover"
            />
          </div>
          <div className="w-full lg:w-1/3">
            <img 
              src={img2} 
              alt="AI Tutor Course Preview 2" 
              className="w-full h-auto rounded-3xl lg:rounded-4xl shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover"
            />
          </div>
        </div>

        {/* Second Row - Responsive Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-8">
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <img 
              src={img4} 
              alt="AI Tutor Course Preview 4" 
              className="w-full h-auto rounded-3xl lg:rounded-4xl shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover"
            />
          </div>
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <img 
              src={img3} 
              alt="AI Tutor Course Preview 3" 
              className="w-full h-auto rounded-3xl lg:rounded-4xl shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover"
            />
          </div>
        </div>
      </div>

      {/* CTA Button Section */}
      <div className="text-center mt-10 md:mt-12 lg:mt-16">
        <button 
          onClick={() => window.open("https://algo-tutor.vercel.app/")}
          className="bg-black text-white font-bold px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 rounded-full 
            hover:bg-white hover:text-black hover:border-2 hover:border-black 
            transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl
            text-base md:text-lg lg:text-xl w-full sm:w-auto"
        >
          Check Our Courses
        </button>
        
        {/* Optional Additional Info */}
        <p className="text-gray-500 mt-4 text-sm md:text-base">
          Join platforms for professionals who have upgraded their skills
        </p>
      </div>

      <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
        <div className="text-center p-4">
          <div className="text-2xl md:text-3xl font-bold text-black mb-2">80+</div>
          <div className="text-gray-700 font-medium">Courses</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl md:text-3xl font-bold text-black mb-2">Rewards</div>
          <div className="text-gray-700 font-medium">Completions Certificates</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl md:text-3xl font-bold text-black mb-2">Precise</div>
          <div className="text-gray-700 font-medium">Long Detailed Course</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl md:text-3xl font-bold text-black mb-2">Industry Based</div>
          <div className="text-gray-700 font-medium">Real World Projects</div>
        </div>
      </div>
    </div>
  )
}

export default AiTutor