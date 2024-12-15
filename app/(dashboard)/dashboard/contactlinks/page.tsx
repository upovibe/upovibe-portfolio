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
import { Contact } from "lucide-react";

// Define the contactLink type
interface ContactLink {
  id: string;
  name: string;
  slug: string;
  href: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const page = async () => {
  try {
    const contactLink: ContactLink[] = await prisma.contactLink.findMany();

    const deleteRow = async (id: string | number) => {
      "use server";
      const idString = typeof id === "number" ? id.toString() : id;
      await prisma.contactLink.delete({ where: { id: idString } });
    };

    const transformedContactLink = contactLink.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      href: item.href,
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
              <BreadcrumbPage>My contact links</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Contact className="size-5" />
          My contact links
        </h1>
        <TableLayout
          data={transformedContactLink}
          title="contaclink"
          deleteRow={deleteRow}
          baseUrl="/dashboard/contactlinks"
        />
      </div>
    );
  } catch (error) {
    console.error("Error in page:", error);
    return <div>Error loading contact links.</div>;
  }
};

export default page;

