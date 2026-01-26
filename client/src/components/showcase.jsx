import React from 'react'
import Card from './card'
import { BsCurrencyDollar, BsGeoAlt, BsStars, BsTrophy } from 'react-icons/bs'

const cardData = [
    {
        title: "A draft in 10 mins",
        description: "The AI builder is 10 x faster than doing on your own",
        icon: BsStars
    },
    {
        title: "High Quality Content",
        description: "Professional templates optimized for ATS systems",
        icon: BsTrophy
    },
    {
        title: "Location Specific",
        description: "Tailored for your target job market and industry",
        icon: BsGeoAlt
    },
    {
        title: "Cost Effective",
        description: "Premium results at a fraction of professional services",
        icon: BsCurrencyDollar
    },
]

function Showcase() {
  return (
    <section className="px-4 py-8 md:py-12 lg:py-16">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12 lg:mb-16">
        <h1 className="font-bold text-gray-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-3 md:mb-4">
          You Are Just One Click Away
        </h1>
        <h2 className="font-bold text-gray-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif">
          From Your Dream Job
        </h2>
        {/* Optional subtitle */}
        <p className="text-gray-600 mt-4 md:mt-6 text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
          Create professional resumes and cover letters with our AI-powered builder
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cardData.map((card, id) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={id}
                card={{
                  ...card,
                  imageUrl: <IconComponent className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Optional CTA Button */}
      <div className="text-center mt-10 md:mt-12 lg:mt-16">
        <a href='/build'   className="inline-block bg-black text-white font-bold 
              px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 
              rounded-full hover:bg-white hover:text-black 
              border-2 border-black transition-all duration-300 
              cursor-pointer shadow-lg hover:shadow-xl active:scale-95
              text-base sm:text-lg md:text-xl
              w-full sm:w-auto text-center"
            aria-label="Create My Resume - Start building your winning resume">
          Get Started Now
        </a>
      </div>
    </section>
  )
}

export default Showcase
