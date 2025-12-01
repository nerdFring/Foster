import React from 'react'


const Navbar = () => {
  return (
    <>

    <div className="flex justify-between bg-black text-white p-7 ">
        <div className='font-bold text-2xl '>MyLogo</div>
        <div className='flex cursor-pointer gap-4 '>
            <div className='bg-black text-white font-bold border-2 border-white px-8 py-2 hover:bg-white
             hover:text-black hover:border-2 hover:border-black rounded-full'>Home</div>
            <div className='bg-black text-white font-bold border-2 border-white px-8 py-2 hover:bg-white
             hover:text-black hover:border-2 hover:border-black rounded-full'>About</div>
            <div className='bg-black text-white font-bold border-2 border-white px-8 py-2 hover:bg-white
             hover:text-black hover:border-2 hover:border-black rounded-full'>Contact</div>
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

