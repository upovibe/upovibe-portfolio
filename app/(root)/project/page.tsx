import React from "react";
import { prisma } from "@/prisma";
import ProjectsList from "@/components/landingPageUi/ProjectsList";

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany();
  return <ProjectsList projects={projects} />;
};

export default ProjectsPage;
