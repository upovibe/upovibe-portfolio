import React from "react";
import { fetchProjects, fetchContactLinks, fetchSkills } from "@/lib/data";
import Dashboard from "@/components/dashboardUi/Dashboard";

// Fetch data from the database
const page = async () => {
  const projects = await fetchProjects();
  const skills = await fetchSkills();
  const contactLinks = await fetchContactLinks();

  return <Dashboard projects={projects}skills={skills} contactLinks={contactLinks}  />;
};

export default page;
