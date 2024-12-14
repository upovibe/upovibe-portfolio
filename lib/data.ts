import { prisma } from "@/prisma";

// Fetch all projects
export const fetchProjects = async () => {
  return await prisma.project.findMany();
};

// Fetch the latest 4 projects
export const fetchLatestProjects = async () => {
  return await prisma.project.findMany({
    take: 4, 
    orderBy: {
      createdAt: 'desc',
    },
  });
};


// Fetch all skills
export const fetchSkills = async () => {
  return await prisma.skill.findMany()
};

// Fetch all skills
export const fetchContactLinks = async () => {
  return await prisma.contactLink.findMany()
};