import React, { useState, useEffect } from 'react';

function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between 
      gap-6 sm:gap-8 md:gap-12 py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24
      min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] overflow-hidden">
      
      {/* Text Content */}
      <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 
        order-2 lg:order-1 mt-6 sm:mt-8 lg:mt-0">
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
            font-serif leading-snug sm:leading-tight md:leading-tight">
            This resume builder gets you
          </h1>
          <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
            font-serif leading-snug sm:leading-tight md:leading-tight font-extrabold text-black">
            paid more
          </h1>
        </div>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl 
          leading-relaxed sm:leading-relaxed">
          Only 2% of resumes win. Yours will be one of them.
        </p>
        
        {/* CTA Button */}
        <div className="pt-2 sm:pt-4">
          <a 
            href='/build' 
            className="inline-block bg-black text-white font-bold 
              px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 
              rounded-full hover:bg-white hover:text-black 
              border-2 border-black transition-all duration-300 
              cursor-pointer shadow-lg hover:shadow-xl active:scale-95
              text-base sm:text-lg md:text-xl
              w-full sm:w-auto text-center"
            aria-label="Create My Resume - Start building your winning resume">
            Create My Resume
          </a>
        </div>
        
        {/* Trust Indicator */}
        <p className="text-xs xs:text-sm sm:text-base text-gray-500 mt-4 sm:mt-6 md:mt-8 
          pt-2 sm:pt-4 border-t border-gray-100">
          Join over 1 million professionals who landed jobs with our resumes
        </p>
        
        {/* Mobile-only additional feature highlights */}
        {isMobile && (
          <div className="grid grid-cols-2 gap-3 pt-4 sm:hidden">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <span className="text-sm text-gray-700">ATS Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
              <span className="text-sm text-gray-700">Fast Results</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Image Content */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end 
        order-1 lg:order-2 relative">
        <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg 
          lg:max-w-xl xl:max-w-2xl">
          <img 
            src="https://www.intelligentcv.app/career/wp-content/uploads/2025/08/FULL-NAME-724x1024.png" 
            alt="Professional Resume Example - ATS-friendly resume template that gets interviews"
            className="w-full rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl
              transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
              border border-gray-100"
            loading="eager"
          />
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-3 -right-3 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 
            bg-blue-100 rounded-full -z-10 hidden sm:block"></div>
          <div className="absolute -top-3 -left-3 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 
            bg-yellow-100 rounded-full -z-10 opacity-70 hidden md:block"></div>
          
          {/* Success Badge (Desktop) */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 
            bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 
            rounded-lg shadow-lg transform rotate-3 hidden sm:block">
            <div className="text-xs sm:text-sm font-bold">98% SUCCESS RATE</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;