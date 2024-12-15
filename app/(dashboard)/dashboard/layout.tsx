"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/dashboardUi/Sidebar";
import Header from "@/components/layouts/Header";
import Unauthorized from "@/components/dashboardUi/Unauthorized";
import LoaderCircle from "@/components/ui/LoaderCircle";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoaderCircle />;
  }

  if (!session || !session.user) {
    return <Unauthorized />;
  }

  const { user } = session;

  return (
    <div className="flex flex-col">
      <Header />
      <main className="w-full container flex mx-auto px-4 py-8">
        <Sidebar user={user} />
        <div className="flex-1 rounded-lg m-0 md:ml-5 p-4 border-gray-800 bg-gray-900 text-gray-300">
          {children}
        </div>
      </main>
    </div>
  );
}
