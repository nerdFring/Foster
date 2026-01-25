import React from 'react'
import { useAuth } from '../../context/auth'
import { Balloon, HamIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const {user,loading,logOut}=useAuth()
  const userId=user?._id
  const handleLogOut=async()=>{
    await logOut()
    navigate("/login")
  }
  return (
    <>

<div className="flex justify-between bg-black text-white p-7 sticky top-0 z-50">
        <a href='/' className='font-bold text-2xl '>FOSTER</a>
        <div className='flex cursor-pointer gap-4 '>
            <a href='/' className='bg-white text-black font-bold border-2 border-black px-8 py-2 hover:bg-black
             hover:text-white hover:border-2 hover:border-white rounded-full'>Home</a>
            <a href={`/my-resume`} className='bg-white text-black font-bold border-2 border-black px-8 py-2 hover:bg-black
             hover:text-white hover:border-2 hover:border-white rounded-full'>My Resume</a>
            <a href='/contact' className='bg-white text-black font-bold border-2 border-black px-8 py-2 hover:bg-black
             hover:text-white hover:border-2 hover:border-white rounded-full'>Contact</a>
                     </div>
        <div className='flex cursor-pointer gap-4 underline  text-lg'>
       {user?(<button className='cursor-pointer' onClick={handleLogOut}>Logout</button>): <a href='/login' className='font-bold'>Login</a>}    
       {user? (<HamIcon/>):<a href='/register' className='font-bold'>SignUp</a>}    
        </div>
    </div>
      
    </>
  )
}

export default Navbar
