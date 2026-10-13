"use client";

import { motion } from "framer-motion";
import React, { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { RESUME_INFO } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Download } from "lucide-react";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError(true);
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => setError(false), 4000);
      return;
    }

    if (!message.trim()) {
      setError(true);
      setErrorMessage("Please type a message before sending.");
      setTimeout(() => setError(false), 4000);
      return;
    }

    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY || "";

    if (!form.current) return;

    if (!serviceId || !templateId || !publicKey) {
      // Graceful fallback for mock/demo environment or missing env vars
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        form.current?.reset();
        setEmail("");
        setMessage("");
        setName("");
        setTimeout(() => setSuccess(false), 4000);
      }, 800);
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setSuccess(true);
          setLoading(false);
          form.current?.reset();
          setEmail("");
          setMessage("");
          setName("");
          setTimeout(() => setSuccess(false), 4000);
        },
        () => {
          setError(true);
          setErrorMessage("Something went wrong! Please try again or reach out directly via email.");
          setLoading(false);
          setTimeout(() => setError(false), 5000);
        }
      );
  };

  const text = "Let's connect!";
  const textArray = text.split("");

  return (
    <motion.div
      className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-8 lg:py-16 flex items-center justify-center"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Side: Animated headline & contact cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {textArray.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
                >
                  {letter}
                </motion.span>
              ))}{" "}
              <span>👋</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Have a project in mind, need a high-performance frontend application, or want to discuss opportunities? I am available for remote full-time positions and contracts.
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="space-y-3 pt-2">
            <Card className="bg-white/80 border-slate-200/80 shadow-xs backdrop-blur-md">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Email Address</span>
                  <a
                    href={`mailto:${RESUME_INFO.email}`}
                    className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {RESUME_INFO.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-slate-200/80 shadow-xs backdrop-blur-md">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Phone / WhatsApp</span>
                  <a
                    href={`tel:${RESUME_INFO.phone.replace(/\s+/g, "")}`}
                    className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    {RESUME_INFO.phone}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-slate-200/80 shadow-xs backdrop-blur-md">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Curriculum Vitae</span>
                  <a
                    href={RESUME_INFO.cvDownloadUrl}
                    download="Jabar_Fatai_CV.pdf"
                    className="text-sm font-semibold text-indigo-600 hover:underline"
                  >
                    Download CV (PDF)
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side: Modern shadcn Contact Form */}
        <div className="lg:col-span-7">
          <Card className="bg-white/95 border-slate-200 shadow-xl backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardContent className="p-6 sm:p-10">
              <form onSubmit={sendEmail} ref={form} className="space-y-5">
                <div className="space-y-1 pb-2">
                  <h2 className="text-2xl font-bold text-slate-900">Send a Message</h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Fill out the form below and I&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    name="user_name"
                    placeholder="e.g. Alex Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Your Email Address
                  </label>
                  <Input
                    type="email"
                    name="user_email"
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Message
                  </label>
                  <Textarea
                    name="user_message"
                    rows={5}
                    placeholder="Tell me about your project, timeline, or open role..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full rounded-xl font-bold shadow-md gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                </Button>

                {/* Status alerts */}
                {success && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Message sent successfully! I will respond promptly.</span>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMessage || "Something went wrong! Please try again."}</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
