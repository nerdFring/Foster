import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'
import { Eye, EyeClosed, Menu, X, User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { user, loading, logOut } = useAuth()
  const userId = user?._id

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogOut = async () => {
    await logOut()
    navigate("/login")
  }

  const handleShow = () => {
    setShow(!show)
  }

  const handleMobileLinkClick = () => {
    if (isMobile) {
      setShow(false)
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black text-white">
        <div className="flex items-center justify-between p-4 sm:p-5 md:p-7">
          <a 
            href='/' 
            className='font-bold text-xl sm:text-2xl md:text-3xl tracking-tight hover:opacity-90 transition-opacity'
          >
            FOSTER
          </a>

          <div className='hidden md:flex items-center gap-4 lg:gap-6'>
            <a 
              href='/' 
              className='bg-white text-black font-bold border-2 border-black px-6 lg:px-8 py-2 hover:bg-black
               hover:text-white hover:border-2 hover:border-white rounded-full transition-all duration-300 active:scale-95'
            >
              Home
            </a>
            <a 
              href={`/my-resume`} 
              className='bg-white text-black font-bold border-2 border-black px-6 lg:px-8 py-2 hover:bg-black
               hover:text-white hover:border-2 hover:border-white rounded-full transition-all duration-300 active:scale-95'
            >
              My Resume
            </a>
            <a 
              href='/contact' 
              className='bg-white text-black font-bold border-2 border-black px-6 lg:px-8 py-2 hover:bg-black
               hover:text-white hover:border-2 hover:border-white rounded-full transition-all duration-300 active:scale-95'
            >
              Contact
            </a>
          </div>

          <div className='hidden md:flex items-center gap-4 lg:gap-6'>
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLogOut}
                  className='text-white hover:text-gray-300 font-medium text-lg transition-colors duration-300 flex items-center gap-2'
                >
                  <LogOut size={20} />
                  Logout
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <User size={18} />
                </div>
              </div>
            ) : (
              <>
                <a 
                  href='/login' 
                  className='text-white hover:text-gray-300 font-medium text-lg transition-colors duration-300'
                >
                  Login
                </a>
                <a 
                  href='/register' 
                  className='bg-white text-black font-bold border-2 border-white px-6 lg:px-8 py-2 hover:bg-black
                   hover:text-white hover:border-2 hover:border-white rounded-full transition-all duration-300 active:scale-95'
                >
                  Sign Up
                </a>
              </>
            )}
          </div>


          <button 
            onClick={handleShow}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            aria-label={show ? "Close menu" : "Open menu"}
          >
            {show ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {show && (
          <div className="md:hidden fixed inset-0 bg-black z-40 pt-20">
            {/* Close button overlay */}
            <div className="absolute top-4 right-4">
              <button 
                onClick={handleShow}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            
            <div className="px-4 py-8 h-full flex flex-col">
              <div className="space-y-4 mb-8">
                <a 
                  href='/' 
                  onClick={handleMobileLinkClick}
                  className="block w-full bg-white text-black font-bold border-2 border-white px-6 py-4 
                    hover:bg-black hover:text-white hover:border-2 hover:border-white rounded-xl 
                    transition-all duration-300 active:scale-[0.98] text-center text-lg"
                >
                  Home
                </a>
                
                <a 
                  href={`/my-resume`} 
                  onClick={handleMobileLinkClick}
                  className="block w-full bg-white text-black font-bold border-2 border-white px-6 py-4 
                    hover:bg-black hover:text-white hover:border-2 hover:border-white rounded-xl 
                    transition-all duration-300 active:scale-[0.98] text-center text-lg"
                >
                  My Resume
                </a>
                
                <a 
                  href='/contact' 
                  onClick={handleMobileLinkClick}
                  className="block w-full bg-white text-black font-bold border-2 border-white px-6 py-4 
                    hover:bg-black hover:text-white hover:border-2 hover:border-white rounded-xl 
                    transition-all duration-300 active:scale-[0.98] text-center text-lg"
                >
                  Contact
                </a>
              </div>

              {/* Auth Buttons */}
              <div className="mt-auto space-y-4 pb-8">
                {user ? (
                  <>
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="text-white font-medium">Welcome back</p>
                        <p className="text-gray-300 text-sm">{user.email}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        handleLogOut()
                        handleMobileLinkClick()
                      }}
                      className="block w-full bg-red-600 text-white font-bold px-6 py-4 
                        hover:bg-red-700 rounded-xl transition-all duration-300 
                        active:scale-[0.98] text-center text-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a 
                      href='/login' 
                      onClick={handleMobileLinkClick}
                      className="block w-full bg-gray-800 text-white font-bold px-6 py-4 
                        hover:bg-gray-700 rounded-xl transition-all duration-300 
                        active:scale-[0.98] text-center text-lg border border-gray-700"
                    >
                      Login
                    </a>
                    
                    <a 
                      href='/register' 
                      onClick={handleMobileLinkClick}
                      className="block w-full bg-white text-black font-bold px-6 py-4 
                        hover:bg-gray-100 rounded-xl transition-all duration-300 
                        active:scale-[0.98] text-center text-lg border-2 border-white"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>

              {/* Additional Mobile Info */}
              <div className="text-center text-gray-400 text-sm mt-8 pt-6 border-t border-gray-800">
                <p>Need help? <a href="/contact" className="text-white underline">Contact Support</a></p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
