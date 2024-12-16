"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ProjectsList for client-side rendering
const ProjectsList = dynamic(
  () => import("@/components/landingPageUi/ProjectsList"),
  { ssr: false }
);

interface Project {
  id: string;
  slug: string;
  title: string;
  href: string;
  image: string | null;
}

interface PageProps {
  projects: Project[];
}

const Projects: React.FC<PageProps> = ({ projects }) => {
  return <ProjectsList projects={projects} />;
};
export default Projects;
