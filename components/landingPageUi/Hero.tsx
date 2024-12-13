"use client";

import React from "react";
import Lottie from "lottie-react";
import HeroData from "@/public/animations/Hero.json";
import { motion } from "framer-motion";

function Hero() {
  // Animation variants for the text and animation
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      id="hero"
      initial="hidden"
      animate="visible"
      className="h-screen border-b border-gray-200/20 w-full container flex flex-col lg:flex-row items-center lg:justify-between pt-20 pb-10 px-6 gap-10"
    >
      {/* Left Side (Text Content) */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left"
        variants={textVariants}
      >
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
          Fullstack Developer
        </h3>
        <h1 className="text-3xl font-extrabold text-white mb-4 lg:text-4xl">
          Promise Uzor Okwudiri
        </h1>
        <p className="text-lg text-gray-300">
          Crafting impactful web solutions with modern technologies. Ready to
          collaborate, innovate, and grow with forward-thinking teams.
        </p>
      </motion.div>

      {/* Right Side (Lottie Animation) */}
      <motion.div
        className="w-full lg:w-4/12 flex justify-center items-center"
        variants={animationVariants}
      >
        <Lottie animationData={HeroData} loop={true} className="max-w-lg lg:max-w-full" />
      </motion.div>
    </motion.div>
  );
}

export default Hero;
