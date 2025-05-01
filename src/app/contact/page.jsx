"use client"
import { motion } from "framer-motion"
import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';

function Contact() {

  const user_name = "Abdfatahi"
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setTimeout(() => setError(false), 4000); // auto-hide error after 4s
      return;
    }
  // Auto-clear loading just in case

    emailjs
      .sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, form.current, {
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      })
      .then(
        () => {
         setSuccess(true);
         setLoading(false);
          form.current.reset();
          setTimeout(() => {
            setSuccess(false);
          }, 3000); // Hide after 3 seconds
        },
        (error) => {
          setError(true);
          setLoading(false);
          setTimeout(() => setError(false), 4000); // auto-hide error after 4s
        },
      );
  }; // Closing brace added for sendEmail function

  const text = 'Say Hello!'
  const textArray = text.split("")
  return (
    <motion.div 
    className="h-full" 
    initial={{ y: "-200vh" }} 
    animate={{ y: 0 }} 
    transition={{ duration: 1 }}
    >
  <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
    
    {/* text container */}
    <div className="h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center text-6xl">
    <div>
    {textArray.map((letter, index) => (
      <motion.span 
      key={index} 
      initial={{ opacity: 1}} 
      animate={{ opacity: 0}} 
      transition={{ duration: 3, repeat:Infinity, delay: index * 0.1 }} 
      className=""
      >
        {letter}
      </motion.span>
    ))}
    😊
    </div>
    </div>
    {/* form container */}
    <form
    onSubmit={sendEmail}
     ref={form} 
     className="lg:h-full lg:w-1/2 mt-8 bg-red-50 rounded-xl text-xl flex flex-col gap-8 justify-center p-24 "
     >
     {loading && <span className="text-blue-500 font-semibold">Loading...</span>}
    <span user_name={user_name}>Dear {user_name}!</span>
    <textarea rows={6} 
    className="bg-transparent border-b-2 border-b-black outline-none resize-none "
    name="user_message"
    placeholder="Type your message here..."
    />
    <span >My mail address is:</span>
    <input 
    type="text" 
    className="bg-transparent border-b-2 border-b-black outline-none"
    name="user_email"
    onChange={(e) => setEmail(e.target.value)}
    />
    <span>Regards</span>
    <button 
    onClick={() => {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000); 
    }}
    className="bg-purple-200 rounded font-semibold text-sm text-gray-600 hover:bg-gray-700 hover:text-white p-4"
    >
      Send
    </button>
    {success && <span className="text-green-500 italic">Message sent successfully! 👍✔</span>}
    {error && <span className="text-red-500 italic">Something went wrong!❌</span>}
   {error && !email && <span className="text-red-500 italic">Email is required.❌</span>}
  {error && email && <span className="text-red-500 italic">Please enter a valid email.❌</span>}

    </form>
  </div>
    </motion.div>
  )
}

export default Contact