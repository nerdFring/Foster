import React from 'react'
import { BsStars } from "react-icons/bs";


function Card({card}) {
  return (
    <>
    <div className="max-w-sm  border-black  my-3  transform
    hover:scale-[1.05] transition-transform duration-100 hover:shadow-[#62605b]
    bg-gray-100 border- shadow-2xl px-5 py-8">
    <div>{card?.imageUrl}</div>
    <p className='font-mono text-lg py-2'>{card?.title}</p>
    <p className='text-sm line-clamp-2  py-2'>{card?.description}
</p>

    </div>
    </>
  )
}

export default Card
