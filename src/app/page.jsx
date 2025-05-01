"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Homepage = () => {
  return (
    <motion.div 
    className="h-full" 
    initial={{ y: "-200vh" }} 
    animate={{ y: 0 }} 
    transition={{ duration: 1 }}>
    <div className="h-full flex flex-col lg:flex-row gap-8 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 overflow-x-hidden relative">
      {/* Image Container */}
      <div className="h-1/2 lg:h-full lg:w-1/2 relative">
          <Image src="/hero3.jpg" alt="" fill className="object-contain"/>
        </div>

      {/* Text Container */}
      <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-1/2 text-center p-4">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
        Crafting Digital Experiences, Designing Tomorrow.
        </h1>
        
        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg">
          Welcome to my digital canvas, where innovation and creativity
          converge. With a keen eye for aesthetics and a mastery of code, my
          portfolio showcases a diverse collection of projects that reflect my
          commitment to excellence.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 sm:gap-4 w-full justify-center">
          <Link href="/portfolio">
          <button className="p-2 sm:p-3 md:p-4 rounded ring-1 ring-black bg-black text-white text-sm sm:text-base">
            View My Work
          </button>
          </Link>
          <Link href="/contact">
          <button className="p-2 sm:p-3 md:p-4 rounded ring-1 ring-black text-sm sm:text-base">
            Contact Me
          </button>
          </Link>
        </div>
      </div>
    </div>
    
    </motion.div>
  );
};

export default Homepage;
