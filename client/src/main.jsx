import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes}  from 'react-router-dom';
import ResumeForm from './components/resumeForm.jsx';
import SignupForm from './auth/register.jsx';
import Login from './auth/login.jsx';
import { AuthProvider } from '../context/auth.jsx';
import ProtectedRoute from './auth/protectedRoute.jsx';
import VerifyEmail from './auth/verifyEmail.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route element={<ProtectedRoute/>}> 
        <Route path="/build" element={<ResumeForm />} />
    </Route>
    <Route path='/verify-email/:verifyToken' element={<VerifyEmail />} />
    
            <Route path="/register" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />

</Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
