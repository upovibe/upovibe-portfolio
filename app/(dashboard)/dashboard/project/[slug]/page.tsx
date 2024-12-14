import React from "react";
import Image from "next/image";
import { prisma } from "@/prisma";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FolderGit2 } from "lucide-react";
import DeleteButton from "@/components/dashboardUi/DeleteButton";
import { deleteProject } from "@/app/api/crude/formActions";
import { Button } from "@/components/ui/button";
import FroalaContentView from "@/components/ui/FroalaContentView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: {
      slug: resolvedParams.slug,
    },
  });

  if (!project) {
    return (
      <div>
        <h1 className="text-  font-bold">Project Not Found</h1>
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
            <BreadcrumbPage>{project.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col w-full gap-3 border p-2 rounded-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold flex items-center gap-2 capitalize">
            <FolderGit2 className="size-5" />
            {project.title}
          </h1>
          <h2 className="border-t border-b py-1 text-xl">
            {project.description}
          </h2>
        </div>
        {/* Image Section */}
        {project.image && (
          <div className="w-full h-64 relative overflow-hidden rounded-lg border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="prose max-w-none mb-6 overflow-hidden h-auto w-full">
          <FroalaContentView model={project.content} />
        </div>
        <div className="w-full flex items-center gap-2 justify-end">
          <Button className="bg-slate-400 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-white duration-200 ease-linear ">
            <Link href={`/dashboard/project/${project.slug}/edit`}>Edit</Link>
          </Button>
          <DeleteButton
            action={deleteProject}
            args={[String(project.id)]}
            buttonText="Delete"
            successRedirect="/dashboard/project"
            errorMessage="Error deleting project"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
