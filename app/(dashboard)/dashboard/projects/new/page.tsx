import React from "react";
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
import { createProject } from "@/app/api/crude/formActions";
import FormLayout from "@/components/dashboardUi/FormLayout";

const page = () => {
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
            <Link href="/dashboard/project">Projects</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Add new</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="size-5" />
          Add new project
        </h1>
        <FormLayout
          fields={["title", "href",  "description", "content", "tags", "image"]}
          labels={{
            title: "Project Name",
            description: "Project Description",
            href: "A link to full project or Demo",
            content: "Project",
            tags: "Tags",
            image: "Image",
          }}
          onSubmit={createProject}
          initialData={{}}
          successRedirect={"/dashboard/projects"}
        />
      </div>
    </div>
  );
};

export default page;
