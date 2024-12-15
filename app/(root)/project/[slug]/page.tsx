import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/prisma";
import { format } from "date-fns";
import { Clock12 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CopyLinkButton from "@/components/ui/CopyLinkButton";
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

  // Fetch other projects excluding the current one
  const otherProjects = await prisma.project.findMany({
    where: {
      NOT: {
        slug: resolvedParams.slug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  if (!project) {
    return (
      <div className="w-full h-auto container flex justify-center items-center mx-auto">
        <h1 className="text-2xl font-bold text-center">Project not found.</h1>
      </div>
    );
  }

  // Format dates
  const createdAt = format(new Date(project.createdAt), "MMMM d, yyyy");
  const updatedAt = format(new Date(project.updatedAt), "MMMM d, yyyy");

  // Split and map tags
  const tags = project.tags.split(",");

  return (
    <div className="w-full h-auto container mx-auto py-12 pb-32 px-4 flex flex-col lg:flex-row justify-between gap-14">
      {/* Main Content */}
      <div className="w-full lg:w-7/12 p-4 border-2 border-gray-200/20 rounded-xl bg-gray-800/50 backdrop-blur-md shadow-lg">
        {project.image && (
          <div className="w-full flex min-h-[10rem] rounded-lg items-center justify-center overflow-hidden shadow">
            <Image
              src={project.image}
              alt={project.title}
              width={1000}
              height={500}
              className="object-center"
            />
          </div>
        )}

        <h1 className="text-4xl text-gray-100 font-bold my-4 capitalize">
          {project.title}
        </h1>
        <p className="text-lg text-gray-200 mb-4 border-l-4 border-gray-500 pl-4 my-6 capitalize">
          {project.description}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-2 my-4 border-t border-b border-gray-500 py-3">
          <div className="flex items-center gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 text-sm font-semibold py-0.5 px-3 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
          <CopyLinkButton />
        </div>
        <div className="prose max-w-none mb-6 overflow-hidden h-auto w-full text-gray-300 p-4 backdrop-blur-md rounded-xl">
          <FroalaContentView model={project.content} />
        </div>
        <Separator className="my-10" />
        <div className="text-sm text-gray-500 flex justify-between">
          <div className="flex items-center gap-0.5">
            <span className="hidden lg:inline-flex">Published:</span>
            <Clock12 className="size-4 block lg:hidden" />
            <span> {createdAt}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="hidden lg:inline-flex">Last Updated:</span>
            <Clock12 className="size-4 block lg:hidden" />
            <span> {updatedAt}</span>
          </div>
        </div>
      </div>
      {/* End of Main Content */}

      {/* Sidebar for other projects */}
      <div className="w-full lg:w-4/12 lg:border-l border-gray-500 lg:pl-8 lg:px-5 px-0 py-5">
        <h2 className="text-2xl text-white/90 font-bold mb-4">
          Other Projects
        </h2>
        <div className="space-y-6">
          {otherProjects.map((otherProject) => {
            const otherCreatedAt = format(
              new Date(otherProject.createdAt),
              "MMMM d, yyyy"
            );
            return (
              <>
                <Link
                  key={otherProject.id}
                  href={`/project/${otherProject.slug}`}
                  className="flex gap-4 p-2 hover:bg-gray-100/30 transition duration-200 rounded-lg"
                >
                  {otherProject.image && (
                    <Image
                      src={otherProject.image}
                      alt={otherProject.title}
                      width={80}
                      height={80}
                      className="rounded-md size-16 object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-50">
                      {otherProject.title}
                    </h3>
                    <p className="text-sm text-gray-500">{otherCreatedAt}</p>
                  </div>
                </Link>
                <Separator className="" />
              </>
            );
          })}
        </div>
      </div>
      {/* End of Sidebar */}
    </div>
  );
};

export default page;
