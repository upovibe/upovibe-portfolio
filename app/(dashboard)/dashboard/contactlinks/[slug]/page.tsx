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
import { Contact } from "lucide-react";
import DeleteButton from "@/components/dashboardUi/DeleteButton";
import { deleteContactLink } from "@/app/api/crude/formActions";
import { Button } from "@/components/ui/button";

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

  if (!contactLink) {
    return (
      <div>
        <h1 className="text-  font-bold">contactLink Not Found</h1>
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
            <Link href="/dashboard/contactlinks">Contact Link</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{contactLink.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col w-full gap-3 border p-2 rounded-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold flex items-center gap-2 capitalize">
            <Contact className="size-5" />
            {contactLink.name}
          </h1>
        </div>
        {/* Image Section */}
        {contactLink.image && (
          <div className="size-40 relative overflow-hidden rounded-lg border flex items-center justify-center">
            <Image
              src={contactLink.image}
              alt={contactLink.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>{contactLink.href}</div>
        <div className="w-full flex items-center gap-2 justify-end">
          <Button className="bg-slate-400 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-white duration-200 ease-linear ">
            <Link
              href={`/dashboard/contactlinks/${contactLink.slug}/edit`}
            >
              Edit
            </Link>
          </Button>
          <DeleteButton
            action={deleteContactLink}
            args={[String(contactLink.id)]}
            buttonText="Delete"
            successRedirect="/dashboard/contactlinks"
            errorMessage="Error deleting contactLink"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
