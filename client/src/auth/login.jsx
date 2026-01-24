import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {user,loading}=useAuth()
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [message, setmessage] = useState('')
  const [apiError, setApiError] = useState('');
const navigate=useNavigate()
useEffect(() => {
  if (!loading && user) {
    navigate("/");
  }
}, [user, loading]);

const handleResend = async () => {
  if (!formData.email) {
    setApiError("Please enter your email first");
    return;
  }

  try {
    setApiError('');
    setmessage('');

    const response = await fetch("http://localhost:3000/resend-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: formData.email })
    });

    const data = await response.json();

    if (!response.ok) {
      // 👇 THIS is the optional frontend message
      setApiError(data.message);
      return;
    }

    // success
    setmessage(data.message);

  } catch (error) {
    setApiError("Something went wrong. Try again later.");
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setApiError('');
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      setSubmitSuccess(true);
      
      // if (data.token) {
      //   localStorage.setItem('authToken', data.token);
      //   localStorage.setItem('user', JSON.stringify(data.user));
      // }
      
      setTimeout(() => {
        window.location.href = '/build';
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      setApiError(error.message || 'An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Login To Account</h1>
          <p className="text-gray-600">Welcome back to our community</p>
        </div>
        
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="font-medium">Login successful! Redirecting...</p>
          </div>
        )}

           { message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="font-bold">{message}</p>
          </div>
       ) }
        
        {apiError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">{apiError}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
          <div className="space-y-6">
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500 cursor-pointer hover:text-gray-700" />
                  ) : (
                    <FaEye className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

             <button
             onClick={handleResend}
             disabled={apiError.includes("already sent")}
              className="w-full cursor-pointer bg-gray-900 text-white font-medium py-3 px-4 rounded-lg
               hover:bg-white hover:text-gray-900 hover:border-2
                hover:border-gray-900 transition-all duration-300 ease-in-out focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >Resend Email</button>
    
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-gray-900 text-white font-medium py-3 px-4 rounded-lg
               hover:bg-white hover:text-gray-900 hover:border-2
                hover:border-gray-900 transition-all duration-300 ease-in-out focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </span>
              ) : (
                'Login to Account'
              )}
            </button>
            
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-gray-900 font-medium hover:underline">
                Sign Up
              </a>
            </div>
          </div>
        </form>
        
        <p className="text-center text-gray-500 text-sm mt-8">
          By signing in, you agree to our terms. Your data is secure with us.
        </p>
      </div>
    </div>
  );
};

export default Login;
