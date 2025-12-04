import React, { useState } from 'react'
import { BsEnvelope, BsBriefcase, BsPersonPlus, BsGraphUp, BsAward } from 'react-icons/bs'

function Tools() {
  const [activeTool, setActiveTool] = useState('getNoticed')

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
      buttonIcon: <BsEnvelope size={32} />,
      buttonLabel: "Get Noticed"
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
      buttonIcon: <BsBriefcase size={32} />,
      buttonLabel: "Get Hired"
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
      buttonIcon: <BsPersonPlus size={32} />,
      buttonLabel: "Build Network"
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
      buttonIcon: <BsGraphUp size={32} />,
      buttonLabel: "Grow Career"
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
      buttonIcon: <BsAward size={32} />,
      buttonLabel: "Excel at Work"
    }
  }

  const buttons = Object.keys(toolData).map(key => ({
    id: key,
    label: toolData[key].buttonLabel,
    icon: toolData[key].buttonIcon
  }))


  return (
    <>
      <h1 className='font-bold text-center py-6 text-4xl'>Every tool you need is here...</h1>
      <section className='flex justify-center items-center'>
        <section className="flex items-center gap-6 my-10">
          
          {/* Left Side - Buttons */}
          <div className='w-[20vw] bg-gray-100 p-7 border-2 border-gray-400 shadow-xl rounded-2xl'>
            {buttons.map((button) => (
              <button
                key={button.id}
                className={`flex cursor-pointer items-center gap-3 px-8 py-4 w-full mb-2 last:mb-0 rounded-lg transition-all duration-300 ${
                  activeTool === button.id 
                    ? 'bg-gray-950 text-gray-100 border-l-4 border-gray-800' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setActiveTool(button.id)}
              >
                {button.icon}
                <p className='font-medium text-xl'>{button.label}</p>
              </button>
            ))}
          </div>

          {/* Right Side - Cards */}
          <div className='flex gap-6'>
            {/* First Card */}
            <div className='max-w-sm bg-gray-100 p-7 border-2 border-gray-400 shadow-2xl rounded-2xl'>
              <h1 className='text-2xl font-bold mb-3'>{toolData[activeTool].card1.title}</h1>
              <p className='text-gray-600 mb-4'>{toolData[activeTool].card1.description}</p>
              <img 
                src={toolData[activeTool].card1.image} 
                className='max-w-xs rounded-2xl w-full h-48 object-cover' 
                alt={toolData[activeTool].card1.title} 
              />
            </div>

            {/* Second Card */}
            <div className='max-w-sm bg-gray-100 p-7 border-2 border-gray-400 shadow-2xl rounded-2xl'>
              <h1 className='text-2xl font-bold mb-3'>{toolData[activeTool].card2.title}</h1>
              <p className='text-gray-600 mb-4'>{toolData[activeTool].card2.description}</p>
              <img 
                src={toolData[activeTool].card2.image} 
                className='max-w-xs rounded-2xl w-full h-48 object-cover' 
                alt={toolData[activeTool].card2.title} 
              />
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Tools

