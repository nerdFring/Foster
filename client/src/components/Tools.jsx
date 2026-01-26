import React, { useState, useEffect } from 'react'
import { 
  BsEnvelope, 
  BsBriefcase, 
  BsPersonPlus, 
  BsGraphUp, 
  BsAward,
  BsChevronLeft,
  BsChevronRight
} from 'react-icons/bs'

function Tools() {
  const [activeTool, setActiveTool] = useState('getNoticed')
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileCards, setShowMobileCards] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toolData = {
    getNoticed: {
      card1: {
        title: "Profile Optimization",
        description: "Optimize your professional profile with AI-powered suggestions to increase visibility by 300%.",
        image: "https://gohire.io/hubfs/Top%20HR%20Tools%20Every%20HR%20Manager%20Should%20Know.png"
      },
      card2: {
        title: "Resume Builder",
        description: "Create ATS-friendly resumes that pass through automated screening systems with our smart builder.",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      buttonIcon: <BsEnvelope size={24} />,
      buttonLabel: "Get Noticed",
      color: "bg-blue-50",
      borderColor: "border-white",
      activeColor: "bg-gray-600"
    },
    getHired: {
      card1: {
        title: "Job Matching",
        description: "Our AI matches you with jobs that fit your skills, experience, and career aspirations perfectly.",
        image: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      card2: {
        title: "Interview Prep",
        description: "Practice with mock interviews and get feedback to ace your next job interview.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      buttonIcon: <BsBriefcase size={24} />,
      buttonLabel: "Get Hired",
      color: "bg-green-50",
      borderColor: "border-green-200",
      activeColor: "bg-green-600"
    },
    network: {
      card1: {
        title: "Professional Network",
        description: "Connect with industry professionals and expand your network with smart suggestions.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      card2: {
        title: "LinkedIn Optimization",
        description: "Optimize your LinkedIn profile to attract more recruiters and relevant connections.",
        image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      buttonIcon: <BsPersonPlus size={24} />,
      buttonLabel: "Build Network",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      activeColor: "bg-purple-600"
    },
    grow: {
      card1: {
        title: "Skill Development",
        description: "Access personalized learning paths to develop in-demand skills for career growth.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      card2: {
        title: "Career Pathing",
        description: "Map out your career trajectory with our guidance tools and milestone tracking.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      buttonIcon: <BsGraphUp size={24} />,
      buttonLabel: "Grow Career",
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      activeColor: "bg-orange-600"
    },
    excel: {
      card1: {
        title: "Productivity Tools",
        description: "Master workplace efficiency with our suite of productivity enhancement tools.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      card2: {
        title: "Performance Analytics",
        description: "Track and analyze your work performance with detailed metrics and insights.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      buttonIcon: <BsAward size={24} />,
      buttonLabel: "Excel at Work",
      color: "bg-red-50",
      borderColor: "border-red-200",
      activeColor: "bg-red-600"
    }
  }

  const buttons = Object.keys(toolData).map(key => ({
    id: key,
    label: toolData[key].buttonLabel,
    icon: toolData[key].buttonIcon,
    color: toolData[key].color,
    borderColor: toolData[key].borderColor,
    activeColor: toolData[key].activeColor
  }))

  const handlePrevTool = () => {
    const toolIds = Object.keys(toolData)
    const currentIndex = toolIds.indexOf(activeTool)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : toolIds.length - 1
    setActiveTool(toolIds[prevIndex])
  }

  const handleNextTool = () => {
    const toolIds = Object.keys(toolData)
    const currentIndex = toolIds.indexOf(activeTool)
    const nextIndex = currentIndex < toolIds.length - 1 ? currentIndex + 1 : 0
    setActiveTool(toolIds[nextIndex])
  }

  return (
    <div className="px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 md:py-12">
      {/* Header */}
      <h1 className='font-bold text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl 
        py-4 md:py-6 text-gray-800'>
        Every tool you need is here...
      </h1>

      {/* Mobile Navigation (Carousel Style) */}
      {isMobile && (
        <div className="mb-6">
          {/* Tool Selection Bar */}
          <div className="flex items-center justify-between gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {buttons.map((button) => (
              <button
                key={button.id}
                className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-[80px] flex-shrink-0 transition-all duration-300 ${
                  activeTool === button.id 
                    ? `${button.color} ${button.borderColor} border-2` 
                    : 'bg-gray-100 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTool(button.id)}
              >
                <div className={`p-2 rounded-full ${activeTool === button.id ? button.activeColor : 'bg-gray-300'}`}>
                  {React.cloneElement(button.icon, { 
                    className: activeTool === button.id ? 'text-white' : 'text-gray-600',
                    size: 20 
                  })}
                </div>
                <span className={`text-xs font-medium mt-2 ${activeTool === button.id ? 'text-gray-800' : 'text-gray-600'}`}>
                  {button.label}
                </span>
              </button>
            ))}
          </div>

          {/* Cards Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setShowMobileCards(!showMobileCards)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium"
            >
              {showMobileCards ? "Hide Details" : "Show Details"}
            </button>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-4 md:gap-6 lg:gap-8">
        
        {/* Left Side - Buttons (Desktop) */}
        {!isMobile && (
          <div className='w-full lg:w-1/4 xl:w-1/5 bg-gray-50 p-4 md:p-6 border border-gray-200 
            shadow-lg rounded-xl lg:sticky lg:top-8'>
            <div className="space-y-2">
              {buttons.map((button) => (
                <button
                  key={button.id}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-300 ${
                    activeTool === button.id 
                      ? `${button.activeColor} text-white shadow-md transform scale-[1.02]` 
                      : `hover:bg-gray-100 ${button.color}`
                  } ${button.borderColor} ${activeTool === button.id ? 'border-0' : 'border'}`}
                  onClick={() => setActiveTool(button.id)}
                >
                  <div className={`p-2 rounded-lg ${activeTool === button.id ? 'bg-white/20' : button.color}`}>
                    {button.icon}
                  </div>
                  <p className='font-medium text-base md:text-lg'>{button.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Right Side - Cards */}
        <div className='w-full lg:w-3/4 xl:w-4/5'>
          {/* Mobile Navigation Arrows */}
          {isMobile && showMobileCards && (
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevTool}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous tool"
              >
                <BsChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-gray-800 text-center">
                {toolData[activeTool].buttonLabel}
              </h2>
              <button
                onClick={handleNextTool}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next tool"
              >
                <BsChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Cards Container */}
          {(showMobileCards || !isMobile) && (
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 md:gap-6`}>
              {/* First Card */}
              <div className={`w-full ${isMobile ? '' : 'lg:w-1/2'} 
                ${toolData[activeTool].color} p-4 md:p-6 border ${toolData[activeTool].borderColor} 
                shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <h1 className='text-xl xs:text-2xl md:text-3xl font-bold mb-3 text-gray-800'>
                  {toolData[activeTool].card1.title}
                </h1>
                <p className='text-gray-600 mb-4 text-sm xs:text-base md:text-lg leading-relaxed'>
                  {toolData[activeTool].card1.description}
                </p>
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={toolData[activeTool].card1.image} 
                    className='w-full h-40 xs:h-48 sm:h-56 md:h-64 object-cover rounded-xl transition-transform duration-500 hover:scale-105' 
                    alt={toolData[activeTool].card1.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
                </div>
              </div>

              {/* Second Card */}
              <div className={`w-full ${isMobile ? '' : 'lg:w-1/2'} 
                ${toolData[activeTool].color} p-4 md:p-6 border ${toolData[activeTool].borderColor} 
                shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <h1 className='text-xl xs:text-2xl md:text-3xl font-bold mb-3 text-gray-800'>
                  {toolData[activeTool].card2.title}
                </h1>
                <p className='text-gray-600 mb-4 text-sm xs:text-base md:text-lg leading-relaxed'>
                  {toolData[activeTool].card2.description}
                </p>
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={toolData[activeTool].card2.image} 
                    className='w-full h-40 xs:h-48 sm:h-56 md:h-64 object-cover rounded-xl transition-transform duration-500 hover:scale-105' 
                    alt={toolData[activeTool].card2.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Indicator Dots */}
          {isMobile && showMobileCards && (
            <div className="flex justify-center gap-2 mt-6">
              {buttons.map((button, index) => {
                const toolIds = Object.keys(toolData)
                const currentIndex = toolIds.indexOf(activeTool)
                return (
                  <button
                    key={button.id}
                    onClick={() => setActiveTool(button.id)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? `${button.activeColor} w-8` : 'bg-gray-300'
                    }`}
                    aria-label={`Go to ${button.label}`}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile CTA */}
      {isMobile && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4 text-sm">
            Tap any tool above to explore its features
          </p>
          <button 
            onClick={() => setActiveTool('getNoticed')}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Try All Tools Free
          </button>
        </div>
      )}
    </div>
  )
}

export default Tools