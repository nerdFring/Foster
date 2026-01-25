
import React, { useEffect, useState } from 'react'
import { BsArrowClockwise, BsEnvelope, BsEnvelopeFill, BsGeoAlt, BsGeoAltFill, BsLinkedin } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
const SITE_KEY = "6LdPc8ArAAAAAH16aNXeLSZ5OygBQsTUMeQCSM6O";
// import ReCAPTCHA from "react-google-recaptcha";


function ContactPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
const [captchaToken, setcaptchaToken] = useState(null)



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!captchaToken) {
//       setSubmitStatus("Please verify the captcha");
//       return;
//     }
//  const verifyRes = await fetch("/api/captcha_verify", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: captchaToken }),
//       });

//       const { success } = await verifyRes.json();
//       if (!success) {
//         setSubmitStatus("Captcha verification failed");
//         return;
//       }
    
//     if (!subject.trim() || !message.trim()) {
//       setSubmitStatus('Please fill in all fields');
//       return;
//     }

//     if (!userId || !userEmail) {
//       setSubmitStatus('Login Required!');
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus('');

//     try {
//       await addDoc(collection(db, 'INQUIRY'), {
//         userId,
//         userEmail,
//         subject: subject.trim(),
//         message: message.trim(),
//         createdAt: serverTimestamp(),
//         status: 'new'
//       });

//       setSubject('');
//       setMessage('');
//       setSubmitStatus('Message sent successfully!');
//             setcaptchaToken(null);

//     } catch (error) {
//       console.error('Error sending message:', error);
//       setSubmitStatus('Failed to send message. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(()=>{
//     if(user){
//       trackingApi()
//     }
//   },[user])

  return (
    <>
    <Navbar/>
      <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
          <div className="md:flex">
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br
             from-gray-900 via-gray-700 to-gray-90 p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="mb-6 text-blue-100">Have questions or need assistance? We're here to help! Our team will get back to you as soon as possible.</p>
              <div className="space-y-4 mt-16">
             <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=01hammadraza@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center hover:underline"
>
  <BsEnvelopeFill className="w-6 h-6 mr-2" />
  <span className='underline'>01hammadraza@gmail.com</span>
</a>


                    <Link href="https://www.linkedin.com/in/hammad-raza-221369263/" className="hover:underline flex items-center">
  <BsLinkedin className="w-6 h-5 mr-4 " />
     <span className='underline'>Hammad Raza</span>
  </Link>

              <div className="flex items-center">
  <BsGeoAltFill className="w-6 h-6 mr-4" />
  <span>Pakistan<br />Sindh, Karachi</span>
</div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 py-10 px-6 sm:px-10 md:px-12">
              <div className="text-center mb-2 md:hidden">
                <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
              
                <p className="mt-2 text-gray-600">We'd love to hear from you</p>
              </div>
              
              <form 
            //   onSubmit={handleSubmit}
               className="mt-8 space-y-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="w-full p-4 rounded-lg border-2 border-gray-300 focus:border-gray-500 focus:ring-gray-500 focus:outline-none transition-colors"
                    type="text"
                    placeholder='Enter Subject'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-4 rounded-lg border-2 border-gray-300 focus:border-gray-500 focus:ring-gray-500 focus:outline-none transition-colors min-h-[150px]"
                    placeholder='Enter your message here...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {submitStatus && (
                  <div className={`rounded-md py-2 px-4 text-center ${
                    submitStatus.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {submitStatus}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-bold cursor-pointer flex flex-row items-center justify-center bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 border-2 border-white hover:border-black hover:text-black focus:ring-gray-500 text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                         <BsArrowClockwise className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />

                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                {/* <div className="flex justify-center sm:scale-100 scale-75 origin-top-left">
  <ReCAPTCHA
    sitekey={SITE_KEY}
    onChange={(token) => setcaptchaToken(token)}
  />
</div> */}
                
                <div className="text-center text-xs text-gray-500 mt-4 md:hidden">
                  <p className='text-lg font-bold text-black'>Prefer to contact us directly?</p>
                  <a  
                    target="_blank"
  rel="noopener noreferrer"

                  href="https://mail.google.com/mail/?view=cm&fs=1&to=01hammadraza@gmail.com"
className='border-b-2 border-amber-500 mt-1'> Email:01hammadraza@gmail.com</a>
                  <p className='inline-block border-b-2 mt-1 border-amber-500'><Link href="https://www.linkedin.com/in/hammad-raza-221369263/" >Linkedin:
    Hammad Raza
  </Link></p>  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="text-center text-lg font-bold text-gray-900 mt-4 hidden md:block">
        <p>Developed By Hammad Raza </p>
      </div> */}
    </>
    
  )
}

export default ContactPage;