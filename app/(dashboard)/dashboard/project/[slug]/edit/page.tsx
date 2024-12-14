import React from "react";
import { prisma } from "@/prisma";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Tag } from "lucide-react";
import FormLayout from "@/components/dashboardUi/FormLayout";
import { editProject } from "@/app/api/crude/formActions";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: {
      slug: resolvedParams.slug,
    },
  });

  if (!project || !project.id) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Project Not Found</h1>
      </div>
    );
  }
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
            <Link href="/dashboard/project">project</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/dashboard/project/${project.slug}`}>
              {project.slug}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="size-5" />
          Edit {project.slug}
        </h1>
        <FormLayout
          fields={["title", "description", "content", "tags", "image"]}
          labels={{
            title: "Project Name",
            description: "Project Description",
            content: "Project",
            tags: "Tags",
            image: "Image",
          }}
          onSubmit={editProject}
          additionalSubmitArgs={[project.id]}
          initialData={{
            title: project.title,
            description: project.description,
            content: project.content,
            tags: project.tags,
            image: project.image,
          }}
          successRedirect={"/dashboard/project"}
        />
      </div>
    </div>
  );
};

export default page;
