import React from 'react'

const Navbar = () => {
  return (
    <>

    <div className="flex justify-between bg-black text-white p-7 ">
        <div className='font-bold text-2xl '>MyLogo</div>
        <div className='flex cursor-pointer gap-4 '>
            <div className='bg-white text-black font-bold px-8 py-2 hover:bg-black
             hover:text-white hover:border-2 hover:border-white rounded-full'>Home</div>
   <div className='bg-white text-black font-bold px-8 py-2 hover:bg-black
             hover:text-white hover:border-2 hover:border-white rounded-full'>Start</div>
                <div className='bg-white text-black font-bold px-8 py-2 hover:bg-black
             hover:text-white hover:border-2 hover:border-white rounded-full'>Sample</div>
                     </div>
        <div className='flex cursor-pointer gap-4 underline text-lg'>
            <div className='font-bold'>Login</div>
            <div className='font-bold'>SignUp</div>
        </div>

    </div>
      
    </>
  )
}

export default Navbar
