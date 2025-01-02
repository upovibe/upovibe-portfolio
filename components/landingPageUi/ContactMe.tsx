"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import ContactForm from "@/components/form/ContactForm";
import { Separator } from "../ui/separator";

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
      className="h- w-full max-w-lg flex flex-col items-center container mx-auto py-40 px-6 gap-10"
    >
      <h3 className="text-2xl font-bold text-emerald-400  mb-10 border-b-2 border-emerald-400 pb-2">
        Contact Me
      </h3>
      <ContactForm />
      <Separator />
      <motion.div
        className="w-full flex flex-col flex-wrap md:flex-row items-center"
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
              <Link
                key={contactLink.id}
                href={contactLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center"
              >
                {contactLink.image !== null && (
                  <Image
                    src={contactLink.image}
                    alt={contactLink.name}
                    width={400}
                    height={400}
                    className="min-w-8 max-w-8 transition-all duration-300"
                  />
                )}
              </Link>
            ))}
      </motion.div>
    </div>
  );
};

export default ContactMe;
