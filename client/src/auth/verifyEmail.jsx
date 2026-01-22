import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle, XCircle, Loader2, MailCheck } from 'lucide-react'
import { useRef } from 'react'

const VerifyEmail = () => {
    const { verifyToken } = useParams()
    const navigate = useNavigate()
    const [status, setStatus] = useState("verifying")
    const [message, setMessage] = useState("")
    const hasRun=useRef(false)

    const verifying = async () => {
        try {
            const response = await fetch(`http://localhost:3000/verify-email/${verifyToken}`,{ 
                credentials: 'include', 
                method:'GET'
            }
)
            const data = await response.json()
            
            if (response.status===200 ||response.ok) {
                setStatus("success")
                setMessage(data.message || "Email verified successfully")
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                setStatus("error")
                setMessage(data.message || "Verification failed")
            }
        } catch (error) {
            setStatus("error")
            setMessage("Verification failed or expired")
        }
    }

    useEffect(() => {
          if (hasRun.current) return;
    hasRun.current = true;
        verifying()
    }, [verifyToken])

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <MailCheck className="h-12 w-12 text-black" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Email Verification
                    </h2>
                    <p className="text-gray-600">
                        {status === "verifying" 
                            ? "Please wait while we verify your email"
                            : "We're confirming your email address"}
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    {/* Status Indicator */}
                    <div className="flex flex-col items-center">
                        {status === "verifying" && (
                            <>
                                <Loader2 className="h-16 w-16 text-black animate-spin mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Verifying Your Email
                                </h3>
                                <p className="text-gray-600 text-center">
                                    Please wait a moment...
                                </p>
                            </>
                        )}

                        {status === "success" && (
                            <>
                                <div className="mb-4">
                                    <div className="relative">
                                        <CheckCircle className="h-16 w-16 text-green-600" />
                                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Email Verified!
                                </h3>
                                <p className="text-gray-600 text-center mb-6">
                                    {message}
                                </p>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-600 rounded-full animate-[progress_2s_ease-in-out]"></div>
                                </div>
                                <p className="text-sm text-gray-500 mt-4">
                                    Redirecting to login...
                                </p>
                            </>
                        )}

                        {status === "error" && (
                            <>
                                <div className="mb-4">
                                    <XCircle className="h-16 w-16 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Verification Failed
                                </h3>
                                <p className="text-gray-600 text-center mb-6">
                                    {message}
                                </p>
                                <div className="space-y-4 w-full">
                                    <button
                                        onClick={verifying}
                                        className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        Try Again
                                    </button>
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="w-full border border-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Return to Sign Up
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center space-y-4">
                    {status === "verifying" && (
                        <p className="text-sm text-gray-500">
                            This usually takes just a few seconds
                        </p>
                    )}
                    
                    {status === "success" && (
                        <div className="animate-fade-in">
                            <p className="text-sm text-gray-500">
                                You will be redirected to the login page automatically
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-sm text-black font-medium hover:text-gray-700 mt-2"
                            >
                                Click here to go now
                            </button>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Need help? Contact our support team
                            </p>
                            <a
                                href="mailto:support@example.com"
                                className="text-sm text-black font-medium hover:text-gray-700"
                            >
                                support@example.com
                            </a>
                        </div>
                    )}
                </div>
            </div>

          
        </div>
    )
}

export default VerifyEmail