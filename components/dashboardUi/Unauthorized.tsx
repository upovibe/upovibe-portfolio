import React from "react";

const Unauthorized = () => {
  return (
    <main className="w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Unauthorized</h1>
      <p className="mt-4 text-lg">You need to sign in to view this page.</p>
    </main>
  );
};

export default Unauthorized;
