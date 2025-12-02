import React from 'react'
import Card from './card'
import { BsCurrencyDollar, BsGeoAlt, BsStars, BsTrophy } from 'react-icons/bs'

const cardData=[
    {
        title:"A draft in 10 mins",
        description:"The AI builder is 10 x faster than doing on your own",
        imageUrl:    <BsStars size={38}/>
    },
      {
        title:"A draft in 10 mins",
        description:"The AI builder is 10 x faster than doing on your own",
        imageUrl:    <BsTrophy size={38}/>
    },  {
        title:"A draft in 10 mins",
        description:"The AI builder is 10 x faster than doing on your own",
        imageUrl:    <BsGeoAlt size={38}/>
    },  {
        title:"A draft in 10 mins",
        description:"The AI builder is 10 x faster than doing on your own",
        imageUrl:    <BsCurrencyDollar size={38}/>
    },
]

function Showcase() {
  return (
    <>
      <section>
        <div className=' text-center py-3 font-bold text-black text-5xl font-serif'>
            You Are Just One Click Away
        </div>
        <div className=' text-center py-3 font-bold text-black text-5xl font-serif'>
            From Your Dream Job
        </div>
        <div className="flex py-4 justify-evenly items-center">
          {cardData.map((card,id)=>{
            return (
              <>
                      <Card card={card} key={id} />

              </>
            )
          })}


        </div>
      </section>
    </>
  )
}

export default Showcase

