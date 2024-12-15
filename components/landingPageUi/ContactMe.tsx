"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface ContactLink {
  id: string;
  name: string;
  image: string | null;
  href: string;
}

interface ContactMeProps {
  contactlinks: ContactLink[];
}

const ContactMe: React.FC<ContactMeProps> = ({ contactlinks }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading time of 2 seconds
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each contact link animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      id="contact"
      className="h-auto flex flex-col items-center container mx-auto py-40 px-6 gap-10"
    >
      <h3 className="text-2xl font-bold text-emerald-400  mb-10 border-b-2 border-emerald-400 pb-2">
        Contact Me
      </h3>
      <motion.div
        className="w-full flex flex-col flex-wrap md:flex-row items-center justify-between gap-4"
        variants={containerVariants}
        initial="hidden"
        animate={loading ? "hidden" : "visible"}
      >
        {loading
          ? // Skeleton Loading
            Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-4"
                >
                  {/* Skeleton for Link */}
                  <Skeleton className="w-60 h-11 rounded-full" />
                </div>
              ))
          : // Contact Link Data Rendering
            contactlinks.map((contactLink) => (
              <motion.div
                key={contactLink.id}
                className="group relative bg-gray-800 p-1 px-2 h-12 pr-3 flex items-center justify-center shadow-xl rounded-full hover:shadow-emerald-500 hover:shadow transition-all duration-300 ease-linear"
                variants={itemVariants}
              >
                <Link
                  href={contactLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-3"
                >
                  <div className="relative flex items-center gap-3">
                    {contactLink.image !== null && (
                      <Image
                        src={contactLink.image}
                        alt={contactLink.name}
                        width={400}
                        height={400}
                        className="min-w-8 max-w-8 transition-all duration-300"
                      />
                    )}
                    <h2 className="text-center text-lg font-bold capitalize text-white transition-all duration-200 ease-linear">
                      {contactLink.name}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
};

export default ContactMe;
