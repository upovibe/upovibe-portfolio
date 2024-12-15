import React from "react";
import { fetchSkills, fetchLatestProjects, fetchContact } from "@/lib/data";
import Landing from "@/components/landingPageUi/Landing";

const Page = async () => {
  const skills = await fetchSkills();
  // const projects = await fetchLatestProjects();
  // const contactlinks = await fetchContact();

  return <Landing skills={skills}/>;
};

export default Page;
