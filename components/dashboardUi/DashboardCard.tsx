import React from "react";
import { FolderGit2, Lightbulb, Contact } from "lucide-react";
import MetricCard from "@/components/dashboardUi/MetricCard";

// Define the prop types for projects, blogs, and skills
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

interface DashboardCardProps {
  projects: Project[];
  skills: Skill[];
  contactLinks: ContactLink[];
}

const DashboardCard: React.FC<DashboardCardProps> = ({ projects, skills, contactLinks }) => {
  const projectCount = projects.filter((project) => project.title).length;
  const skillCount = skills.filter((skill) => skill.name).length;
  const contactLinkCount = contactLinks.filter((contactLink) => contactLink.name).length;


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Projects Card */}
      <MetricCard
        title="Projects"
        count={projectCount}
        icon={<FolderGit2 className="w-12 h-12 text-blue-500 mb-2" />}
        description="Number of existing projects so far"
        cardClassName="bg-gradient-to-r from-blue-100 to-blue-50"
        iconClassName="text-blue-500"
        titleColor="text-gray-800"
        countColor="text-blue-600"
        link="/dashboard/projects"
      />

      {/* Skills Card */}
      <MetricCard
        title="Skills"
        count={skillCount}
        icon={<Lightbulb className="w-12 h-12 text-purple-500 mb-2" />}
        description="Number of skills available"
        cardClassName="bg-gradient-to-r from-purple-100 to-purple-50"
        iconClassName="text-purple-500"
        titleColor="text-gray-800"
        countColor="text-purple-600"
        link="/dashboard/skills"
      />

      {/* Skills Card */}
      <MetricCard
        title="Skills"
        count={contactLinkCount}
        icon={<Contact className="w-12 h-12 text-teal-500 mb-2"/>}
        description="Contact Added"
        cardClassName="bg-gradient-to-r from-teal-100 to-teal-50"
        iconClassName="text-teal-500"
        titleColor="text-gray-800"
        countColor="text-teal-600"
        link="/dashboard/contactlinks"
      />
    </div>
  );
};

export default DashboardCard;
