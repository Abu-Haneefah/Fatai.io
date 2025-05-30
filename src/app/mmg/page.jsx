"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const introTextContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const introTextItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const getCharacterAnimationProps = (index) => ({
  initial: { opacity: 1 },
  animate: { opacity: 0.3 },
  transition: {
    duration: 3,
    repeat: Infinity,
    delay: index * 0.1,
  },
});

const projects = {
  live: [
    {
      name: "Shanonobank ✅",
      link: "https://www.shanonobank.com",
      image: "/shashot.png",
      description: [
        "💳 Investment card feature",
        "👥 Beneficiaries",
        "📧 Email subscription",
        "🌟 Testimonials section",
        "❓ FAQ update",
      ],
    },
    {
      name: "Finerium 🛍️",
      link: "https://thefinerium.com",
      image: "/finshot.png",
      description: ["🛠️ Fixed partners section"],
    },
  ],
  completed: [
    {
      name: "Loop Freight Landing Page 🚚",
      link: "https://loop-frieght-e3caqcu4b-abu-haneefah-s-projects.vercel.app/",
      image: "/loopshot.png",
      description: ["📱 Responsive landing page for mobile and desktop"],
    },
    {
      name: "Payment Gateway Dashboard 💳",
      image: "",
      link: "",
      description: ["✅ Payment dashboard interface completed"],
    },
    {
      name: "Shanono Completed Tasks",
      image: "",
      link: "",
      description: [
        "🛠️ Resolved login issue in production",
        "🛠️ Delimiter and Amount Formatting",
        "📊 Refactored monthly statement of account",
      ],
      isGrouped: true,
    },
  ],
  ongoing: [
    {
      name: "New Shanono UI 🔁",
      image: "",
      link: "",
      description: [
        "🧪 Redesign of sign-up page in progress",
        "📈 Dashboard revamp underway",
      ],
      isGrouped: true,
    },
  ],
};

const AnimatedHeading = ({ text, colorClass }) => (
  <h2
    className={`text-3xl md:text-4xl font-semibold mb-8 text-center ${colorClass}`}
  >
    <div className="inline-block">
      {text.split("").map((letter, index) => (
        <motion.span key={index} {...getCharacterAnimationProps(index)}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  </h2>
);

const ProjectCard = ({ project, borderColor, accentColor }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className={`bg-white rounded-2xl shadow-lg overflow-hidden border ${borderColor} transition-all duration-300`}
  >
    {project.image && (
      <div className="relative h-52 w-full">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    )}
    <div className="p-5">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={`${accentColor} hover:underline`}
          >
            {project.name}
          </a>
        ) : (
          project.name
        )}
      </h3>
      <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700 text-sm">
        {project.description.map((item, i) => (
          <React.Fragment key={i}>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={
                project.isGrouped
                  ? "font-semibold text-purple-700"
                  : `${accentColor}`
              }
            >
              {item}
            </motion.li>
            {project.isGrouped && i < project.description.length - 1 && (
              <li className="text-gray-400 ml-4">...</li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Intro */}
      <motion.section
        className="p-10 text-center bg-white"
        variants={introTextContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          <AnimatedHeading text="My Project Contributions at MMG" />
        </h1>
        <motion.p
          className="text-base max-w-2xl mx-auto text-gray-600"
          variants={introTextItemVariants}
        >
          A breakdown of my work at MMG — categorized into Live, Completed, and
          Ongoing projects.
        </motion.p>
      </motion.section>

      {/* Live Projects */}
      <section className="px-6 py-10">
        <AnimatedHeading text="Live Projects ✅" colorClass="text-indigo-600" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.live.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              borderColor="border-indigo-100"
              accentColor="text-indigo-600"
            />
          ))}
        </div>
      </section>

      {/* Completed Projects */}
      <section className="px-6 py-10 bg-gray-50">
        <AnimatedHeading
          text="Completed Projects ✅"
          colorClass="text-green-600"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.completed.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              borderColor="border-green-100"
              accentColor="text-green-600"
            />
          ))}
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="px-6 py-10">
        <AnimatedHeading
          text="Ongoing Projects 🔁"
          colorClass="text-purple-600"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.ongoing.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              borderColor="border-purple-100"
              accentColor="text-purple-600"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
