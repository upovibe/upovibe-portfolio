"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SignIn from "@/components/layouts/SignIn";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Dynamically import Hero and About components with ssr: false
const Hero = dynamic(() => import("@/components/landingPageUi/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/landingPageUi/About"), { ssr: false });
const Skills = dynamic(() => import("@/components/landingPageUi/Skills"), { ssr: false });
const ProjectArchive = dynamic(() => import("@/components/landingPageUi/ProjectArchive"), { ssr: false });
const ContactMe = dynamic(() => import("@/components/landingPageUi/ContactMe"), { ssr: false });


interface Skill {
  id: string;
  name: string;
  image: string | null;
  score: number;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  image: string | null;
}

interface ContactLink {
  id: string;
  name: string;
  image: string | null;
  href: string;
}

interface PageProps {
  skills: Skill[];
  projects: Project[];
  contactlinks: ContactLink[];
}


const Landing: React.FC<PageProps> = ({ skills, projects, contactlinks }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const target = document.getElementById(hash.replace("#", ""));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "u") {
      event.preventDefault();
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />  {/* Dynamically loaded Hero component */}
      <About />  {/* Dynamically loaded About component */}
      <Skills skills={skills} />{/* Dynamically loaded Skills component */}
      <ProjectArchive projects={projects} />{/* Dynamically loaded Projects component */}
      <ContactMe contactlinks={contactlinks} />{/* Dynamically loaded Contact LInks component */}
      <ScrollToTop />
      <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Landing;
