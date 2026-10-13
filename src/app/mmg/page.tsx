"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, CheckCircle, Clock } from "lucide-react";

interface MMGProject {
  name: string;
  link?: string;
  image?: string;
  description: string[];
  isGrouped?: boolean;
}

const introTextContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const projects: {
  live: MMGProject[];
  completed: MMGProject[];
  ongoing: MMGProject[];
} = {
  live: [
    {
      name: "Shanono Bank",
      link: "https://myshanonobank.com",
      image: "/shashot.png",
      description: [
        "💳 Investment card feature",
        "👥 Beneficiaries management",
        "📧 Email subscription and notifications",
        "🌟 Testimonials & responsive marketing sections",
        "❓ Comprehensive FAQ update & support",
      ],
    },
    {
      name: "Finerium",
      link: "https://thefinerium.com",
      image: "/finshot.png",
      description: ["🛠️ Fixed partners section and responsive mobile UI"],
    },
  ],
  completed: [
    {
      name: "Loop Freight Landing Page",
      link: "https://loop-frieght-e3caqcu4b-abu-haneefah-s-projects.vercel.app/",
      image: "/loopshot.png",
      description: ["📱 Responsive landing page for mobile and desktop cargo operations"],
    },
    {
      name: "Payment Gateway Dashboard",
      image: "/gateway.png",
      link: "",
      description: ["✅ Modern payment analytics dashboard interface completed"],
    },
    {
      name: "Shanono Core Tasks",
      image: "/shashot.png",
      link: "",
      description: [
        "🛠️ Resolved login issue in production",
        "🛠️ Currency delimiter and amount formatting",
        "📊 Refactored monthly statement of account generator",
      ],
      isGrouped: true,
    },
  ],
  ongoing: [
    {
      name: "New Shanono UI Revamp",
      image: "/newdash.png",
      link: "",
      description: [
        "🧪 Modern redesign of sign-up flow in progress",
        "📈 Real-time analytics dashboard revamp underway",
      ],
      isGrouped: true,
    },
  ],
};

const ProjectCard = ({
  project,
  borderColor,
  badgeText,
}: {
  project: MMGProject;
  borderColor: string;
  badgeText: string;
}) => (
  <Card className={`overflow-hidden border ${borderColor} bg-white/95 shadow-md hover:shadow-xl transition-all duration-300`}>
    {project.image && (
      <div className="relative h-48 sm:h-56 w-full bg-slate-100 overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover object-top hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="subtle" className="text-xs font-semibold bg-white/90 backdrop-blur-md">
            {badgeText}
          </Badge>
        </div>
      </div>
    )}
    <CardContent className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors inline-flex items-center gap-1.5"
            >
              <span>{project.name}</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          ) : (
            project.name
          )}
        </h3>
      </div>
      <ul className="space-y-1.5 text-sm text-slate-600">
        {project.description.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function MMGPage() {
  return (
    <main className="min-h-screen py-10 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
      {/* Intro */}
      <motion.section
        className="text-center space-y-3"
        variants={introTextContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Project Contributions at MMG
        </h1>
        <motion.p
          className="text-base sm:text-lg max-w-2xl mx-auto text-slate-600"
          variants={introTextItemVariants}
        >
          Miraton Madador Group (MMG) engineering contributions — categorized into Live, Completed, and Ongoing modules.
        </motion.p>
      </motion.section>

      {/* Live Projects */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-900">Live Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.live.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              borderColor="border-indigo-100"
              badgeText="Live in Production"
            />
          ))}
        </div>
      </section>

      {/* Completed Projects */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <h2 className="text-2xl font-bold text-slate-900">Completed Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.completed.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              borderColor="border-emerald-100"
              badgeText="Completed"
            />
          ))}
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <h2 className="text-2xl font-bold text-slate-900">Ongoing Iterations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.ongoing.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              borderColor="border-purple-100"
              badgeText="In Progress"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
