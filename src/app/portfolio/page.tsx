"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, RESUME_INFO, Project } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Download, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const categories = ["All", "Fintech", "E-commerce", "Dashboard", "EdTech"] as const;

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <motion.div
      className="w-full flex-1 py-10 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-10 border-b border-slate-200/80">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Case Studies & Work</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Engineered with Precision.
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            A curated collection of production web applications, fintech systems, and responsive dashboards built with Next.js, React, TypeScript, and modern styling libraries.
          </p>
        </div>

        {/* Download CV CTA */}
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="gap-2 bg-white/80 border-slate-300 hover:bg-white shadow-xs font-semibold rounded-xl">
            <a href={RESUME_INFO.cvDownloadUrl} download="Jabar_Fatai_CV.pdf">
              <Download className="w-4 h-4 text-slate-700" />
              <span>Download CV (PDF)</span>
            </a>
          </Button>
          <Button asChild className="rounded-xl shadow-md font-semibold">
            <Link href="/contact">Hire Me</Link>
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 py-8 items-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2">Filter by:</span>
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-slate-900 text-white shadow-md scale-105"
                  : "bg-white/80 text-slate-700 border border-slate-200 hover:bg-white hover:text-slate-950"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: Project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col overflow-hidden bg-white/90 backdrop-blur-sm border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 group">
                {/* Image Container with Preview */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Visit Live Deployment
                    </span>
                  </div>

                  {/* Category & Year Tag */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="tech" className="bg-slate-950/85 backdrop-blur-md text-white border-none shadow-md">
                      {project.category}
                    </Badge>
                    <Badge variant="subtle" className="bg-white/90 backdrop-blur-md text-slate-800 font-semibold shadow-xs">
                      {project.year}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="space-y-1.5 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </CardTitle>
                  </div>
                  {project.subtitle && (
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {project.subtitle}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4 flex-1 pb-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights / Bullets if present */}
                  {project.details && project.details.length > 0 && (
                    <ul className="space-y-1.5 pt-1 border-t border-slate-100">
                      {project.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Button asChild variant="outline" size="sm" className="w-full rounded-xl gap-2 font-semibold bg-slate-50 hover:bg-slate-900 hover:text-white transition-colors">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <span>View Live Site</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Call To Action Banner */}
      <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Have a project or looking for a Frontend Engineer?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            I am available for remote full-time positions, contracts, and frontend leadership. Let’s build something incredible together.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-slate-100 rounded-xl font-bold shadow-lg">
            <Link href="/contact">Get In Touch</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl font-semibold">
            <a href={RESUME_INFO.cvDownloadUrl} download="Jabar_Fatai_CV.pdf">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
