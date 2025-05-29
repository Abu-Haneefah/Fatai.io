import React from "react";
import Image from "next/image";

const projects = {
  live: [
    {
      name: "Shanonobank",
      link: "https://www.shanonobank.com",
      image: "/shashot.png",
      description: [
        "Fixed frontend bugs on homepage (social links, join button, typos)",
        "Fixed dashboard quick transfer input",
        "OTP verification on sign-up",
        ".env fix for staging",
        "404 page responsiveness fix",
        "Button responsiveness fix",
        "Hotfix for button on small screens",
        "Testimonials and FAQ section",
        "Investment card feature",
        "Email subscription",
        "Beneficiaries section",
        "......................",
      ],
    },
    {
      name: "Finerium",
      link: "https://thefinerium.com",
      image: "/finshot.png",
      description: ["Fixed partners section"],
    },
  ],
  completed: [
    {
      name: "Loop Freight Landing Page",
      image: "/loopshot.png",
      link: "https://loop-frieght-e3caqcu4b-abu-haneefah-s-projects.vercel.app/",
      description: ["Responsive landing page for mobile and desktop"],
    },
    {
      name: "Payment Gateway Dashboard",
      image: "/paymentgateway.png",
      description: ["Payment dashboard interface completed"],
    },
    {
      name: "Login Issue Fix",
      description: ["Resolved login issue in production"],
    },
    {
      name: "Delimiter",
      description: ["Component for formatting"],
    },
  ],
  ongoing: [
    {
      name: "New Shanono Sign-Up UI",
      description: ["In progress redesign of sign-up page"],
    },
    {
      name: "New Shanono Dashboard",
      description: ["Ongoing dashboard revamp"],
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <section className="p-8 bg-gradient-to-b from-[#0B0B0F] to-[#18181B] text-white text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Hi, I’m Fatai
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
          A passionate frontend developer crafting elegant, accessible, and
          performant interfaces. Currently shaping digital experiences at
          Miraton Matador Group.
        </p>
      </section>

      <section className="p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">
          Live Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.live.map((project, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  width={400}
                  height={200}
                  className="rounded-t-xl object-cover h-48 w-full"
                />
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {project.name}
                  </a>
                </h3>
                <ul className="list-disc ml-6 mt-3 text-sm text-gray-700">
                  {project.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-8 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">
          Completed Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.completed.map((project, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  width={400}
                  height={200}
                  className="rounded-t-xl object-cover h-48 w-full"
                />
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-700 hover:underline"
                    >
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <ul className="list-disc ml-6 mt-3 text-sm text-gray-700">
                  {project.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-700">
          Ongoing Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.ongoing.map((project, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {project.name}
              </h3>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {project.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
