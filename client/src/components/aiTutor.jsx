import React from 'react'
import img1 from '../assets/algo1.png'
import img2 from '../assets/algo2.png'
import img3 from '../assets/algo3.png'
import img4 from '../assets/algo4.png'

function AiTutor() {
  return (
    <>

<h1 className='font-bold text-center py-6 text-4xl'>We are beyond a resume builder...</h1>
<h1 className='font-bold text-center py-6 text-4xl'>Upgrade Your Skills With Latest It Professionals Courses</h1>

<section className='flex justify-center  py-4 items-center' >
<div className="flex gap-3">
<img src={img1} alt="" className=' rounded-4xl max-w-3xl' />
<img src={img2} alt=""  className=' rounded-4xl max-w-lg' />
</div>
</section>
<section className='flex justify-center  py-4 items-center' >
<div className="flex gap-3">
    <img src={img4} alt="" className=' rounded-4xl max-w-3xl' />

<img src={img3} alt=""   className=' rounded-4xl max-w-lg' />

</div>
</section>

<div className="flex justify-center items-center py-10">
    
        <button 
        onClick={ ()=> window.open("https://algo-tutor.vercel.app/")}
         className="bg-black  text-white font-bold px-8 py-4 rounded-full 
          hover:bg-white hover:text-black hover:border-2 hover:border-black 
          transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
          Check Our Courses
        </button >
``
</div>
    
    </>
  )
}

export default AiTutor


