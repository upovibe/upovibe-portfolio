import React from "react";
import Link from "next/link";
import { prisma } from "@/prisma";
import TableLayout from "@/components/dashboardUi/TableLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Lightbulb } from "lucide-react";

// Define the skill type
interface Skill {
  id: string;
  name: string;
  slug: string;
  score: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const page = async () => {
  try {
    const skill: Skill[] = await prisma.skill.findMany();

    const deleteRow = async (id: string | number) => {
      "use server";
      const idString = typeof id === "number" ? id.toString() : id;
      await prisma.skill.delete({ where: { id: idString } });
    };

    const transformedSkill = skill.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      score: item.score,
      image: item.image,
      createdAt: item.createdAt.toLocaleString(),
      updatedAt: item.updatedAt.toLocaleString(),
    }));

    return (
      <div>
        <Breadcrumb className="border px-1 rounded-md mb-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Skills</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Lightbulb className="size-5" />
          Skills
        </h1>
        <TableLayout
          data={transformedSkill}
          title="Skill"
          deleteRow={deleteRow}
          baseUrl="/dashboard/skills"
        />
      </div>
    );
  } catch (error) {
    console.error("Error in page:", error);
    return <div>Error loading skill.</div>;
  }
};

export default page;
