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
import { FolderGit2 } from "lucide-react";

// Define the Project type
interface Project {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const page = async () => {
  try {
    const project: Project[] = await prisma.project.findMany();

    const deleteRow = async (id: string | number) => {
      "use server";
      const idString = typeof id === "number" ? id.toString() : id;
      await prisma.project.delete({ where: { id: idString } });
    };

    const transformedProject = project.map((item) => ({
      id: item.id,
      name: item.title,
      slug: item.slug,
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
              <BreadcrumbPage>Project</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FolderGit2 className="size-5" />
          Projects
        </h1>
        <TableLayout
          data={transformedProject}
          title="Project"
          deleteRow={deleteRow}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in page:", error);
    return <div>Error loading projects.</div>;
  }
};

export default page;

