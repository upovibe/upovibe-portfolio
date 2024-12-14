"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";  // Import dynamic from next/dynamic
import SignIn from "@/components/layouts/SignIn";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Dynamically import the Hero component with ssr: false to disable SSR for this component
const Hero = dynamic(() => import("@/components/landingPageUi/Hero"), { ssr: false });

const Landing: React.FC = () => {
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
      {/* Hero component will now only be rendered on the client side */}
      <Hero />
      <ScrollToTop />
      <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Landing;
