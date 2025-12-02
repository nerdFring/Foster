import React from 'react'

function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 py-8 md:py-12 px-4 md:px-8">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            This resume builder gets you
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight font-extrabold text-black
          ">
            paid more
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
          Only 2% of resumes win. Yours will be one of them.
        </p>
        
        <button className="bg-black text-white font-bold px-8 py-4 rounded-full 
          hover:bg-white hover:text-black hover:border-2 hover:border-black 
          transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
          Create My Resume
        </button>
        
        {/* Optional additional text */}
        <p className="text-sm text-gray-500">
          Join over 1 million professionals who landed jobs with our resumes
        </p>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div className="relative">
          <img 
            src="https://www.intelligentcv.app/career/wp-content/uploads/2025/08/FULL-NAME-724x1024.png" 
            alt="Professional Resume Example"
            className="w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl 
              transform hover:scale-[1.02] transition-transform duration-300"
          />
          {/* Optional decorative element */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero

