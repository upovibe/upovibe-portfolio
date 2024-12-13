import { ArrowUpFromDot } from "lucide-react";
import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    const scrollPosition = window.scrollY;
    setVisible(scrollPosition > 500); // adjust the scroll position value as needed
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  rounded-full transition-all duration-300 size-8 flex items-center justify-center ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpFromDot className="size-5"/>
    </button>
  );
};

export default ScrollToTop;