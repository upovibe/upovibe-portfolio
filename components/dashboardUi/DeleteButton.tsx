"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

interface ActionButtonProps {
  action: (id: string) => Promise<{ success: boolean; error?: string }>;
  args: [string]; 
  successRedirect?: string;
  errorMessage?: string;
  buttonText: string;
}

const DeleteButton: React.FC<ActionButtonProps> = ({
  action,
  args,
  successRedirect = "",
  errorMessage = "An error occurred",
  buttonText,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const result = await action(...args);  // Spread args here as they are an array

      if (result.success) {
        toast.success("Successful!");
        if (successRedirect) {
          router.push(successRedirect);
        }
      } else {
        toast.error(result.error || errorMessage);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <Button variant="destructive" onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <Loader className="animate-spin h-4 w-4" />
        ) : (
          buttonText
        )}
      </Button>

      <ConfirmDeleteDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};


export default DeleteButton;
