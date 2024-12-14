"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import AboutData from "@/public/animations/About.json";
import { motion } from "framer-motion";

const About = () => {
  const images = ["/images/1730735150294.jpeg", "/images/hoMWoCop_400x400.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Animation Variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <motion.div
      id="about"
      className="h-auto flex flex-col-reverse lg:flex-row items-center container mx-auto py-60 px-6 border-b border-gray-200/20 relative justify-between gap-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the section is visible
      variants={{ hidden: {}, visible: {} }} // Wrapper variants (if needed)
    >
      {/* Left Side (Image & Links) */}
      <div className="w-full lg:w-4/12 flex flex-col items-center relative">
        {/* Lottie Animation */}
        <Lottie animationData={AboutData} loop={true} className="absolute max-w-sm -top-24" />

        {/* Image Transition */}
        <motion.div
          className="relative size-[200px] flex items-center justify-center rounded-full border-8 border-gray-500 overflow-hidden shadow-xl"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Portrait ${index + 1}`}
              width={150}
              height={150}
              className={`absolute z-10 size-[170px] rounded-full transition-all duration-500 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Right Side (Text Content) */}
      <motion.div
        className="w-full lg:w-6/12 text-center lg:text-left"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white dark:text-gray-200 mb-4 border-b-2 border-gray-200 pb-2">
          About Me
        </h2>

        {/* First Paragraph */}
        <p className="text-lg text-gray-300 dark:text-gray-400 mb-4">
          I’m a <strong>Fullstack Developer</strong> passionate about creating
          efficient, scalable, and user-friendly web solutions. With experience
          in both <strong>frontend</strong> and <strong>backend</strong>{" "}
          development, I build seamless applications that deliver real value.
        </p>

        {/* Second Paragraph */}
        <p className="text-lg text-gray-300 dark:text-gray-400">
          I’m open to collaboration and always ready to contribute to innovative
          projects. Currently seeking opportunities to join a dynamic team or
          work on exciting freelance ventures.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;
