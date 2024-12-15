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
import { editSkill } from "@/app/api/crude/formActions";

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


  if (!skill || !skill.id) {
    return (
      <div>
        <h1 className="text-2xl font-bold">skill Not Found</h1>
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
            <Link href="/dashboard/skill">skill</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/dashboard/skills/${skill.slug}`}>
              {skill.slug}
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
          Edit {skill.name}
        </h1>
        <FormLayout
          fields={["name", "image", "score"]}
          labels={{
            name: "skill Name",
            score: "Score",
            image: "Image",
          }}
          onSubmit={editSkill}
          additionalSubmitArgs={[skill.id]}
          initialData={{
            name: skill.name,
            score: skill.score,
            image: skill.image,
          }}
          successRedirect={"/dashboard/skills"}
        />
      </div>
    </div>
  );
};

export default page;
