import React from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Github } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("github", { callbackUrl: "/dashboard" });

    if (result?.error) {
      toast.error("Sign in failed!");
    } else {
      toast.success("Sign in successful!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-md z-50">
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-950 w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <Button
            type="submit"
            className="w-full whitespace-nowrap py-2 px-4 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900 rounded-md dark:hover:bg-blue-600 dark:hover:text-white flex items-center justify-center gap-2 transition-all duration-200 ease-linear"
          >
            <span>Sign in with GitHub</span>
            <Github className="size-5" />
          </Button>
        </form>
        <Button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 bg-red-500 hover:bg-red-600 transition-all duration-200 ease-linear rounded-md"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
