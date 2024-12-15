"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateText } from "@/utils/truncateText";
import { motion } from "framer-motion";

interface Project {
  id: string;
  slug: string;
  title: string;
  image: string | null;
}

interface ProjectArchiveProps {
  projects: Project[];
}

const ProjectArchive: React.FC<ProjectArchiveProps> = ({ projects }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading time of 2 seconds
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each project's animation
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
      id="projects"
      className="h-auto flex flex-col items-center container mx-auto p-10 py-[10rem] border-b border-gray-200/20"
    >
      <h3 className="text-2xl font-bold text-emerald-400  mb-10 border-b-2 border-emerald-400 pb-2">
        Projects
      </h3>
      <motion.div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2"
        variants={containerVariants}
        initial="hidden"
        animate={loading ? "hidden" : "visible"}
      >
        {loading
          ? // Skeleton Loading
            Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center justify-center bg-gray-800 dark:bg-gray-600 rounded-xl group transition-all ease-linear after:duration-200 shadow-lg  after:absolute after:bg-gray-500 hover:after:bg-gray-500/50 after:h-1/3 after:left-1/2 after:rounded-xl after:w-11/12 after:top-[-15px] after:z-[-1] after:-translate-x-1/2 rounded-b-xl"
                >
                  {/* Skeleton Image */}
                  <Skeleton className="w-full h-40 rounded-xl" />
                  {/* Skeleton Title */}
                  <Skeleton className="w-3/4 h-8 mt-4 rounded-md" />
                </div>
              ))
          : // Projects Data Rendering
            projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative transition-all ease-linear after:duration-200 shadow-lg  after:absolute after:bg-emerald-500 hover:after:bg-emerald-500/50 after:h-1/3 after:left-1/2 after:rounded-xl after:w-11/12 after:top-[-15px] after:z-[-1] after:-translate-x-1/2 rounded-b-xl"
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="overflow-hidden rounded-xl relative">
                    {/* Image container with overlay */}
                    <div className="relative">
                      <Image
                        src={project.image || "/default-image.jpg"}
                        alt={project.title}
                        width={400}
                        height={400}
                        className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-200"
                      />
                      {/* Background overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Title */}
                    <h2 className="absolute -bottom-2 left-0 right-0 py-4 px-2 bg-gradient-to-t from-black/60 to-transparent group-hover:bg-transparent text-slate-200 group-hover:text-white transition-colors duration-200 text-xl font-bold mb-2 truncate capitalize">
                      {truncateText(project.title)}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
      </motion.div>

      {/* Corrected Link component for navigation */}
      <motion.div variants={itemVariants} className="ml-auto my-8">
        <Button
          variant="ghost"
          className="text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 hover:text-white transition-all duration-200"
        >
          <Link href="/projects">View more</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default ProjectArchive;
