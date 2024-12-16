"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Skill {
  id: string;
  name: string;
  href: string;
  image: string | null;
  score: number;
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading time of 2 seconds
  }, []);

  // Animation Variants
  const skillVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const progressBarVariants = {
    hidden: { width: "0%" },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: { duration: 1, ease: "easeOut" },
    }),
  };

  return (
    <div
      id="skills"
      className="h-auto flex flex-col items-center justify-center container mx-auto p-10 py-[10rem] gap-8 border-b border-gray-200/20"
    >
      <h3 className="text-2xl font-bold text-emerald-400  mb-10 border-b-2 border-emerald-400 pb-2">
        Skills
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 justify gap-10 w-full">
        {loading ? (
          // Skeleton Loading
          Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Skeleton Icon */}
                <Skeleton className="w-[50px] h-[50px] rounded-md" />
                {/* Skeleton Name */}
                <Skeleton className="w-[80px] h-[20px] rounded-full" />
                {/* Skeleton Progress Bar */}
                <Skeleton className="w-[60px] h-[10px] rounded-full" />
              </div>
            ))
        ) : // Skills Data Rendering
        Array.isArray(skills) && skills.length > 0 ? (
          skills.map((skill) => {
            // Calculate the percentage based on the score
            const percentage = Math.min(skill.score, 100);

            // Determine the color based on the score
            let color = "bg-red-500";
            if (percentage >= 75) color = "bg-green-500";
            else if (percentage >= 50) color = "bg-yellow-500";
            else if (percentage >= 25) color = "bg-orange-500";

            return (
              <motion.div
                key={skill.id}
                className="flex flex-col items-center text-center space-y-4"
                variants={skillVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <Link
                  href={skill.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  passHref
                >
                  {/* Skill Icon */}
                  {skill.image !== null && (
                    <Image
                      src={skill.image}
                      alt={`${skill.name} Icon`}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  )}
                </Link>

                {/* Skill Name */}
                <h3 className="text-lg font-semibold text-gray-200 dark:text-gray-400">
                  {skill.name}
                </h3>
                {/* Progress Bar */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="w-[60px] bg-gray-600 dark:bg-gray-700 shadow-inner border rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`${color} h-full rounded-full`}
                          custom={percentage}
                          variants={progressBarVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.5 }}
                        ></motion.div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <strong>{skill.score}%</strong>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            );
          })
        ) : (
          <p>No skills available.</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
