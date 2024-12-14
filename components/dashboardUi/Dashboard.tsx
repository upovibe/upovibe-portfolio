"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/dashboardUi/Unauthorized";
import LoaderCircle from "@/components/ui/LoaderCircle";
import DashboardCard from "@/components/dashboardUi/DashboardCard";

// Define the interfaces for data types
interface Project {
  id: string;
  title: string;
}

interface Skill {
  id: string;
  name: string;
}
interface ContactLink {
  id: string;
  name: string;
}

interface DashboardProps {
  projects: Project[];
  skills: Skill[];
  contactLinks: ContactLink[];
}

const Dashboard: React.FC<DashboardProps> = ({  projects, skills, contactLinks }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoaderCircle />;
  }

  if (!session) {
    return <Unauthorized />;
  }

  const { user } = session;

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome, {user?.name}!</p>

      {/* Pass projects, blogs, and skills to DashboardCard */}
      <DashboardCard projects={projects} skills={skills} contactLinks={contactLinks} />
    </div>
  );
};

export default Dashboard;
