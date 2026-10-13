"use client";

import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import Brain from "@/components/brain";
import { RESUME_INFO, EXPERIENCES } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Download, GraduationCap, Award, Briefcase, CheckCircle2, Sparkles } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef<HTMLDivElement>(null);
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef<HTMLDivElement>(null);
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  const eduRef = useRef<HTMLDivElement>(null);
  const isEduRefInView = useInView(eduRef, { margin: "-100px" });

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Container */}
      <div className="h-full overflow-y-auto lg:flex" ref={containerRef}>
        {/* TEXT CONTAINER */}
        <div className="p-4 sm:p-8 md:p-12 lg:px-16 xl:p-24 flex flex-col gap-20 md:gap-28 lg:w-2/3 lg:pr-6 xl:w-7/12">
          {/* Biography */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
              <Sparkles className="w-4 h-4" />
              <span>About Me</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl shrink-0">
                <Image
                  src="/hero3.jpg"
                  alt={RESUME_INFO.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {RESUME_INFO.name}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-600">
                  {RESUME_INFO.role} &bull; <span className="text-blue-600">Next.js & React</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Based in Nigeria &bull; Available Globally (Remote)
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed pt-2">
              {RESUME_INFO.summary}
            </p>

            <blockquote className="border-l-4 border-slate-900 pl-4 py-1 italic text-slate-600 text-sm sm:text-base bg-white/50 rounded-r-xl">
              &ldquo;Great design isn&apos;t just seen, it&apos;s felt — I build scalable interfaces that empower users and elevate digital businesses.&rdquo;
            </blockquote>

            {/* Action Bar with Download CV */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild className="rounded-xl shadow-md gap-2 font-semibold">
                <a href={RESUME_INFO.cvDownloadUrl} download="Jabar_Fatai_CV.pdf">
                  <Download className="w-4 h-4" />
                  <span>Download Full CV (PDF)</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl bg-white/80 border-slate-300 font-semibold">
                <a href={`mailto:${RESUME_INFO.email}`}>Email: {RESUME_INFO.email}</a>
              </Button>
            </div>

            {/* SVG Signature */}
            <div className="self-end pt-2">
              <svg
                width="140"
                height="45"
                viewBox="0 0 150 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="0"
                  y="35"
                  fontFamily="'Brush Script MT', cursive"
                  fontSize="34"
                  fill="#0f172a"
                >
                  fatai.io
                </text>
              </svg>
            </div>
          </div>

          {/* Skills Section */}
          <div className="flex flex-col gap-6 justify-center" ref={skillRef}>
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={isSkillRefInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                TECHNICAL SKILLS & EXPERTISE
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Proven toolkit across modern frontend architecture, UI engineering, and mobile development.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isSkillRefInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Languages */}
              <Card className="bg-white/80 border-slate-200 shadow-xs">
                <CardContent className="p-4 space-y-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Languages
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {RESUME_INFO.skills.languages.map((skill) => (
                      <Badge key={skill} variant="tech" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Frameworks */}
              <Card className="bg-white/80 border-slate-200 shadow-xs">
                <CardContent className="p-4 space-y-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Frameworks & Libraries
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {RESUME_INFO.skills.frameworks.map((skill) => (
                      <Badge key={skill} variant="tech" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* State & Forms */}
              <Card className="bg-white/80 border-slate-200 shadow-xs">
                <CardContent className="p-4 space-y-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    State & Forms
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {RESUME_INFO.skills.stateAndForms.map((skill) => (
                      <Badge key={skill} variant="tech" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tools & Technologies */}
              <Card className="bg-white/80 border-slate-200 shadow-xs">
                <CardContent className="p-4 space-y-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Tools & Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {RESUME_INFO.skills.tools.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Experience Section */}
          <div className="flex flex-col gap-6 justify-center" ref={experienceRef}>
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={isExperienceRefInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                WORK EXPERIENCE
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Detailed career track record directly aligned with resume accomplishments.
              </p>
            </motion.div>

            {/* Timeline cards */}
            <div className="space-y-6">
              {EXPERIENCES.map((exp, idx) => (
                <Card
                  key={idx}
                  className="bg-white/90 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="p-5 sm:p-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-600" />
                          <span>{exp.role}</span>
                        </h3>
                        <p className="text-sm font-semibold text-slate-700">
                          {exp.company}
                        </p>
                      </div>
                      <Badge variant="subtle" className="text-xs font-bold w-fit bg-slate-100 text-slate-800 border-slate-300">
                        {exp.period}
                      </Badge>
                    </div>

                    <ul className="space-y-2 pt-1">
                      {exp.description.map((item, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="flex flex-col gap-6 justify-center pb-24" ref={eduRef}>
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={isEduRefInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                EDUCATION & CERTIFICATIONS
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-white/90 border-slate-200 shadow-xs">
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Education</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {RESUME_INFO.education.degree}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {RESUME_INFO.education.institution}
                  </p>
                  <p className="text-xs font-semibold text-emerald-600">
                    CGPA: {RESUME_INFO.education.cgpa}
                  </p>
                  <p className="text-xs text-slate-400">
                    {RESUME_INFO.education.period}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-slate-200 shadow-xs">
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-600">
                    <Award className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Certification</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {RESUME_INFO.certification.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {RESUME_INFO.certification.issuer}
                  </p>
                  <p className="text-xs text-slate-400">
                    Issued: {RESUME_INFO.certification.date}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* SVG Brain Container */}
        <div className="hidden lg:block lg:w-1/3 xl:w-5/12 sticky top-0 h-screen z-10 pointer-events-none p-4">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  );
}
