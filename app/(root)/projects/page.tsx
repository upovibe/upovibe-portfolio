import React from "react";
import { prisma } from "@/prisma";
import Projects from "@/components/landingPageUi/Projects";


const page = async () => {
  const projects = await prisma.project.findMany();
  return <Projects projects={projects} />;
};

export default page;
