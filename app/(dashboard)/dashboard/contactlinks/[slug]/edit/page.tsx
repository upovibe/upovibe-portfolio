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
import { editContactLink } from "@/app/api/crude/formActions";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const contactLink = await prisma.contactLink.findUnique({
    where: {
      slug: resolvedParams.slug,
    },
  });

  if (!contactLink || !contactLink.id) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Contact Link Not Found</h1>
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
            <Link href="/dashboard/contactLink">Contact Link</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/dashboard/contactlinks/${contactLink.slug}`}>
              {contactLink.slug}
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
          Edit {contactLink.name}
        </h1>
        <FormLayout
          fields={["name", "href", "image"]}
          labels={{
            name: "contactLink Name",
            href: "Link",
            image: "Image",
          }}
          onSubmit={editContactLink}
          additionalSubmitArgs={[contactLink.id]}
          initialData={{
            name: contactLink.name,
            href: contactLink.href,
            image: contactLink.image,
          }}
          successRedirect={"/dashboard/contactlinks"}
        />
      </div>
    </div>
  );
};

export default page;
