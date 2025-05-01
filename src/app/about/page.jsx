"use client"

import { motion, useInView, useScroll } from "framer-motion"
import Image from "next/image";
import React from 'react'
import { useRef } from "react";
import Brain from "../../components/brain";


function About() {

  const containerRef = useRef();
  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef();
  // const isSkillRefInView = useInView(skillRef, {once:true});
  const isSkillRefInView = useInView(skillRef, {margin:'-100px'});

  const experienceRef = useRef();
  // const isexperienceRefInView = useInView(experienceRef, {once:true});
  const isExperienceRefInView = useInView(experienceRef, {margin:'-100px'});
  
  return (
    <motion.div
    className="h-full"
    initial={{ y: "-200vh" }}
    animate={{ y: "0%" }}
    transition={{ duration: 1 }}
  >
    {/* Container */}
    <div className="h-full overflow-scroll lg:flex" ref={containerRef}>
    {/* TEXT CONTAINER */} 
    <div className="p-4 sm:p-8 md:p-12 lg:px-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64  lg:w-2/3 lg:pr-0 xl:w-1/2">
      {/* Biography */}
      <div className="flex flex-col gap-12 justify-center">
      <h1 className="font-bold text-2xl">BIOGRAPHY</h1> 
       {/* BIOGRAPHY IMAGE */}
       <Image
              src="/hero3.jpg"
              alt=""
              width={112}
              height={112}
              className="w-28 h-28 rounded-full object-cover"
            />
      {/* Biography desc */}
      <p className="text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores porro aspernatur officia, iure perferendis temporibus magni adipisci, distinctio vel eligendi accusantium provident? Optio laudantium minus sit cupiditate voluptates corporis harum!
        </p>
        {/* Biography Quotes */}
      <span className="italic">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
        {/* Biography sign */}
        <div className="self-end">
          {/* Biography svg */}
    <svg
      width="150"
      height="50"
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="35"
        fontFamily="'Brush Script MT', cursive"
        fontSize="36"
        fill="#1a1a1a"
      >
        fatai.io
      </text>
    </svg>
    
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 9L12 15L18 9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      </div>
        {/* Skills */}
      <div className="flex flex-col gap-12 justify-center" ref={skillRef}>

      <motion.h1 
      className="font-bold text-2xl"
      initial={{ x: "-300px" }}
      animate={isSkillRefInView ? { x: 0 } : {}}
      transition={{ delay: 0.2 }}
      >
        SKILLS</motion.h1> 
    
      {/* Skills list */}
      <motion.div 
      className="flex gap-4 flex-wrap"
      initial={{ x: "-300px" }}
      animate={isSkillRefInView ? { x: 0 } : {}}
      >
      <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">HTML5</div>
      <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">CSS3</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">JavaScript</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">React Js</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">Next Js</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">TypeScript</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">NodeJs</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">Bootstrap</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">Tailwind Css</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">JQuery</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">Node Js</div>
        <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">Express Js</div>
      </motion.div>

      {/* Skills scroll svg */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 9L12 15L18 9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      </div>

      
      {/* Experience */}
    <div className="flex flex-col gap-12 justify-center pb-48" ref ={experienceRef}>
      <motion.h1 
      className="font-bold text-2xl"
      initial={{ x: "-300px" }}
      animate={isExperienceRefInView ? { x: 0 } : {}}
      transition={{ delay: 0.2 }}
      >EXPERIENCE</motion.h1> 
      {/* Experience list */}
      <motion.div 
      
      clasName=""
      >

      <div className="flex justify-between h-48">
        {/* left */}
        <div className="w-1/3">
          {/* job title */}
          <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">Frontend Engineer</div>
          {/* Job Desc */}
          <div className="p-3 text-sm italic">Expertise in Frontend Tools to Enhance Users Experience.</div>
          {/* Date */}
          <div className="p-3 text-red-400 text-sm font-semibold">2025 - Present</div>
          {/* Company */}
          <div className="p-3 rounded bg-white text-sm font-semibold w-fit">Miraton Matador Group</div>

        </div>
        {/* Centeer */}
        <div className="w-1/6">
          {/* line */}
          <div className="w-1 h-full bg-gray-600 rounded relative">
            {/* Line circle */}
            <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2.5 -right-2">

            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-1/3">

        </div>
      </div>

        {/* Experience list */}
        <div className="flex justify-between h-48">
        {/* left */}
        <div className="w-1/3">

        </div>
        {/* Centeer */}
        <div className="w-1/6">
          {/* line */}
          <div className="w-1 h-full bg-gray-600 rounded relative">
            {/* Line circle */}
            <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2">

            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-1/3">
    {/* job title */}
    <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">Frontend Engineer</div>
          {/* Job Desc */}
          <div className="p-3 text-sm italic">Expertise in Frontend Tools to Enhance Users Experience.</div>
          {/* Date */}
          <div className="p-3 text-red-400 text-sm font-semibold">2025 - Present</div>
          {/* Company */}
          <div className="p-3 rounded bg-white text-sm font-semibold w-fit">Miraton Matador Group</div>
        </div>
      </div>

        {/* Experience list */}
        <div className="flex justify-between h-48">
        {/* left */}
        <div className="w-1/3">
          {/* job title */}
          <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">Frontend Engineer</div>
          {/* Job Desc */}
          <div className="p-3 text-sm italic">Expertise in Frontend Tools to Enhance Users Experience.</div>
          {/* Date */}
          <div className="p-3 text-red-400 text-sm font-semibold">2025 - Present</div>
          {/* Company */}
          <div className="p-3 rounded bg-white text-sm font-semibold w-fit">Miraton Matador Group</div>

        </div>
        {/* Centeer */}
        <div className="w-1/6">
          {/* line */}
          <div className="w-1 h-full bg-gray-600 rounded relative">
            {/* Line circle */}
            <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2">

            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-1/3"></div>
        
      </div>

    </motion.div>
      </div>

      </div>

    {/* SVG CONTAINER */} 
    <div className="hidden lg:block w-1/3 sticky top-0 z-30 xl:w-1/2">
          <Brain scrollYProgress={scrollYProgress} />
          </div>
    </div>
    </motion.div>
    
  );
}

export default About