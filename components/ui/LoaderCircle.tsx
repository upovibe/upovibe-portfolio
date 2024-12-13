import React from "react";
import { LoaderCircleIcon } from "lucide-react";

const LoaderCircle = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <LoaderCircleIcon className="animate-spin flex items-center justify-center text-blue-600 size-10" />
    </div>
  );
};

export default LoaderCircle;
