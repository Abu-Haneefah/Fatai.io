"use client"

import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import NavLink from "./navLink";
import { motion } from "framer-motion";

const links = [
  {url:"/", title: "Home"},
  {url:"/about", title: "About"},
  {url:"/portfolio", title: "Portfolio"},
  {url:"/contact", title: "Contact"},
]

const Navbar = ()=> {

  const [open,setOpen] = useState(false)


  const topVariants = {
    closed:{
      rotate:0,
    },
    opened:{
      rotate:45,
      backgroundColor:"rgb(255,255,255)"
    }
  }

  const centerVariants = {
    closed:{
      opacity:1,
    },
    opened:{
      opacity: 0,
    }
  }
  const bottomVariants = {
    closed:{
      rotate:0,
    },
    opened:{
      rotate:-45,
      backgroundColor:"rgb(255,255,255)"
    }
  }

  const listVariants ={
    closed:{
      x:"100vw",
    },
    opened:{
     x: 0,
     transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
    }
  }

  const listItemVariants={
    closed:{
      x:-10,
      opacity: 0
    },
    opened:{
     x: 0,
     opacity: 1
    },
  };

  

  return (
    <div className="h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl">
      <div className="hidden md:flex gap-4 w-1/3">
      {/* Links */}
        {links.map((link) => (
        <NavLink link={link} key={link.url}/>
        ))}
      </div>

      {/* LOGO */}
     <div className="md:hidden lg:flex xl:w-1/3 xl:justify-center">
      <Link href="/" 
      className="text-sm bg-black rounded-md p-1 font-semi-bold flex items-center justify-center"
      >
      <span className="text-white mr-1">Fatai</span>
      <span className="w-12 h-8 rounded bg-white text-black flex items-center justify-center">.dev</span>
      </Link>
     </div>
        {/* Socials */}
        <div className="hidden md:flex gap-4  w-1/3">
        <Link 
        href="https://github.com/Abu-Haneefah" 
        target="_blank"
        >
        <Image src="/github.png" alt="" width={24} height={24} />
        </Link>

        <Link 
        href="#" 
        target="_blank"
        >
        <Image src="/dribbble.png" alt="" width={24} height={24} />
        </Link>

        <Link 
        href="https://www.facebook.com/profile.php?id=61565759282922" 
        target="_blank"
        >
        <Image src="/facebook.png" alt="" width={24} height={24} />
        </Link>

        <Link 
        href="#" 
        target="_blank"
        >
        <Image src="/instagram.png" alt="" width={24} height={24} />
        </Link>

        <Link 
        href="https://www.linkedin.com/in/fatai-jabar-9309a4279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
        target="_blank"
        >
        <Image src="/linkedin.png" alt="" width={24} height={24} />
        </Link>


        </div>

     {/* Responsive Menu */}
     {/* Menu button */}
     <div className="md:hidden">
      <button 
      className="w-10 h-8 flex flex-col justify-between z-50 relative" 
      onClick={()=>setOpen(!open)}

      >
        <motion.div 
        variants={topVariants} 
        animate={open ? "opened" : "closed"}
        className="w-10 h-1 bg-black rounded origin-left"
        >
        </motion.div>

        <motion.div 
        variants={centerVariants} 
        animate={open ? "opened" : "closed"}
        className="w-10 h-1 bg-black rounded"
        >
        </motion.div>

        <motion.div 
        variants={bottomVariants} 
        animate={open ? "opened" : "closed"}
        className="w-10 h-1 bg-black rounded origin-left">
        </motion.div>
      </button>
      
      {/* Menu List */}
      {open &&[
      <motion.div
       variants={listVariants}
       initial="closed"
      animate={open ? "opened" : "closed"}
      exit="closed"
       className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-2xl z-40"
       >
      {links.map((link) => (
        <motion.div 
        variants={listItemVariants}
        className="" key={link.url}
        >
        <Link href={link.url}>
          {link.title}
        </Link>
        </motion.div>
      ))}
      </motion.div>
      ]}

     </div>
      </div>
  );
};

export default Navbar