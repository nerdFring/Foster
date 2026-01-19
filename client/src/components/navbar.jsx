import React from 'react'


const Navbar = () => {
  return (
    <>

<div className="flex justify-between bg-black text-white p-7 sticky top-0 z-50">
        <div className='font-bold text-2xl '>MyLogo</div>
        <div className='flex cursor-pointer gap-4 '>
            <a href='/' className='bg-white text-black font-bold border-2 border-black px-8 py-2 hover:bg-black
             hover:text-white hover:border-2 hover:border-white rounded-full'>Home</a>
            <div className='bg-white text-black font-bold border-2 border-black px-8 py-2 hover:bg-black
             hover:text-white hover:border-2 hover:border-white rounded-full'>About</div>
            <div className='bg-white text-black font-bold border-2 border-black px-8 py-2 hover:bg-black
             hover:text-white hover:border-2 hover:border-white rounded-full'>Contact</div>
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

