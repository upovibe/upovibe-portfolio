import React from "react";
import { fetchSkills, fetchLatestProjects, fetchContactLinks } from "@/lib/data";
import Landing from "@/components/landingPageUi/Landing";

const Page = async () => {
  const skills = await fetchSkills();
  const projects = await fetchLatestProjects();
  const contactlinks = await fetchContactLinks();

  return <Landing projects={projects} skills={skills} contactlinks={contactlinks}  />;
};

export default Page;
