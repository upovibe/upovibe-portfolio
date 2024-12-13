"use client";

import React, { useState, useEffect } from "react";
import SignIn from "@/components/layouts/SignIn";

// Define a functional component without props
const Landing: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.getElementById(hash.replace("#", ""));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
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
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      {/* Commented out unused components */}
      {/* <Hero />
      <About />
      <Skills skills={skills} />
      <ProjectArchive projects={projects} />
      <ContactMe contactlinks={contactlinks} />
      <ScrollToTop /> */}
      <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Landing;
