"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/dashboardUi/Unauthorized";
import LoaderCircle from "@/components/ui/LoaderCircle";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoaderCircle />;
  }

  if (!session) {
    return <Unauthorized />;
  }

  const { user } = session;

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome, {user?.name}!</p>
    </div>
  );
};

export default Dashboard;
