"use client";

import React from "react";
import Lottie from "lottie-react";
import HeroData from "@/public/animations/Hero.json";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

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
      className="border-b border-gray-200/20 w-full container flex flex-col lg:flex-row items-center lg:justify-between p-10 py-20 gap-10"
    >
      {/* Left Side (Text Content) */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left"
        variants={textVariants}
      >
        <h3 className="text-lg font-semibold text-gray-400 mb-2">Hi there</h3>
        <h1 className="text-3xl font-extrabold text-white mb-4 lg:text-4xl">
          I am <span className="text-emerald-500">Promise</span>
        </h1>
        <p className="text-gray-300 mb-5">
          Crafting impactful solutions with modern technologies. Ready to{" "}
          <strong className="text-emerald-400 border-b-2 border-emerald-400">
            collaborate
          </strong>
          ,{" "}
          <strong className="text-emerald-400 border-b-2 border-emerald-400">
            innovate
          </strong>
          , and{" "}
          <strong className="text-emerald-400 border-b-2 border-emerald-400">
            grow
          </strong>{" "}
          with forward-thinking teams.
        </p>
        <Button className="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center gap-2 mx-auto lg:mx-0 transition-all duration-200 ease-linear w-fit group">
          <Link
            href="https://raw.githubusercontent.com/upovibe/upovibe/main/CV.pdf"
            download
            className="flex items-center gap-2"
          >
            <Download className="text-white w-5 h-5 transition-transform duration-500 ease-in-out group-hover:translate-y-[-4px] group-hover:animate-bounce" />
            Download CV
          </Link>
        </Button>
      </motion.div>

      {/* Right Side (Lottie Animation) */}
      <motion.div
        className="w-full lg:w-4/12 flex justify-center items-center"
        variants={animationVariants}
      >
        <Lottie
          animationData={HeroData}
          loop={true}
          className="max-w-lg lg:max-w-full"
        />
      </motion.div>
    </motion.div>
  );
}

export default Hero;
