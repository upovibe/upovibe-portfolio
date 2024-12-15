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
import { Lightbulb } from "lucide-react";
import DeleteButton from "@/components/dashboardUi/DeleteButton";
import { deleteSkill } from "@/app/api/crude/formActions";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const skill = await prisma.skill.findUnique({
    where: {
      slug: resolvedParams.slug,
    },
  });

  if (!skill) {
    return (
      <div>
        <h1 className="text-  font-bold">skill Not Found</h1>
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
            <Link href="/dashboard/skills">Skills</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{skill.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col w-full gap-3 border p-2 rounded-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold flex items-center gap-2 capitalize">
            <Lightbulb className="size-5" />
            {skill.name}
          </h1>
        </div>
        {/* Image Section */}
        {skill.image && (
          <div className="size-40 relative overflow-hidden rounded-lg border flex items-center justify-center">
            <Image
              src={skill.image}
              alt={skill.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="w-full flex items-center gap-2 justify-end">
          <Button className="bg-slate-400 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-white duration-200 ease-linear ">
            <Link href={`/dashboard/skills/${skill.slug}/edit`}>Edit</Link>
          </Button>
          <DeleteButton
            action={deleteSkill}
            args={[String(skill.id)]}
            buttonText="Delete"
            successRedirect="/dashboard/skills"
            errorMessage="Error deleting skill"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
