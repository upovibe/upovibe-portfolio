"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import Image from "next/image";
import { truncateText } from "@/utils/truncateText";
import { ImageIcon, X } from "lucide-react";
import FroalaWysiwyg from "@/components/dashboardUi/FroalaWysiwyg";

interface FormLayoutProps {
  fields: Array<
    | "title"
    | "name"
    | "description"
    | "content"
    | "image"
    | "tags"
    | "score"
    | "href"
  >;
  labels?: {
    title?: string;
    name?: string;
    description?: string;
    content?: string;
    image?: string;
    tags?: string;
    score?: string;
    href?: string;
  };
  onSubmit: (
    formData: FormData,
    id: string | number
  ) => Promise<{ success: boolean; error?: string }>;
  additionalSubmitArgs?: unknown[];
  initialData?: {
    title?: string;
    name?: string;
    description?: string;
    content?: string;
    image?: string | null;
    tags?: string;
    score?: number;
    href?: string;
  };
  successRedirect?: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  fields,
  labels = {
    title: "Title",
    name: "Name",
    description: "Short Description",
    content: "Content",
    image: "Image",
    tags: "Tags",
    score: "Score",
    href: "URL",
  },
  onSubmit,
  additionalSubmitArgs = [],
  initialData,
  successRedirect,
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    if (fields.includes("title") && !formData.get("title")) {
      newErrors.title = "Title is required.";
    }
    if (fields.includes("name") && !formData.get("name")) {
      newErrors.name = "Name is required.";
    }
    if (fields.includes("description") && !formData.get("description")) {
      newErrors.description = "Description is required.";
    }
    if (fields.includes("content") && !formData.get("content")) {
      newErrors.content = "Content is required.";
    }
    if (fields.includes("tags") && !formData.get("tags")) {
      newErrors.tags = "Tags are required.";
    }
    if (fields.includes("href") && !formData.get("href")) {
      newErrors.href = "URL is required.";
    }
    if (fields.includes("score")) {
      const score = formData.get("score");
      if (
        !score ||
        isNaN(Number(score)) ||
        Number(score) < 0 ||
        Number(score) > 100
      ) {
        newErrors.score = "Score must be a number between 0 and 100.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(initialData?.image || null);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    const inputElement = document.getElementById("image") as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Add existing image back if no new image is selected
    if (!formData.get("image") && initialData?.image) {
      formData.append("image", initialData.image);
    }

    if (!validateForm(formData)) {
      toast.error("Please fill all required fields.");
      return;
    }

    // const result = await onSubmit(formData, ...additionalSubmitArgs);
    const result = await onSubmit(
      formData,
      ...([additionalSubmitArgs[0]] as [string | number])
    );

    if (result.success) {
      toast.success("Form submitted successfully!");
      if (successRedirect) {
        router.push(successRedirect);
      }
    } else {
      toast.error(`Error: ${result.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-5 border p-4 rounded-lg">
        {fields.includes("title") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="title">{labels.title}</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder={`Enter ${labels.title?.toLowerCase()}`}
              defaultValue={initialData?.title}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
        )}
        {fields.includes("name") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="name">{labels.name}</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder={`Enter ${labels.name?.toLowerCase()}`}
              defaultValue={initialData?.name}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
        )}
        {fields.includes("href") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="href">{labels.href}</Label>
            <Input
              type="url"
              id="href"
              name="href"
              placeholder={`Enter ${labels.href?.toLowerCase()}`}
              defaultValue={initialData?.href}
            />
            {errors.href && (
              <p className="text-red-500 text-sm">{errors.href}</p>
            )}
          </div>
        )}
        {fields.includes("description") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">{labels.description}</Label>
            <Textarea
              placeholder={`Enter ${labels.description?.toLowerCase()}`}
              id="description"
              name="description"
              defaultValue={initialData?.description}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        )}
        {fields.includes("content") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="content">{labels.content}</Label>
            <FroalaWysiwyg
              initialValue={initialData?.content || ""}
              onChange={(value: string) => {
                const hiddenInput = document.getElementById(
                  "hidden-content-input"
                ) as HTMLInputElement;
                if (hiddenInput) {
                  hiddenInput.value = value;
                }
              }}
            />
            <input
              type="hidden"
              id="hidden-content-input"
              name="content"
              defaultValue={initialData?.content || ""}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>
        )}
        {fields.includes("tags") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="tags">{labels.tags}</Label>
            <Input
              type="text"
              id="tags"
              name="tags"
              placeholder="Enter tags separated by commas (e.g., React,JavaScript,Next.js)"
              defaultValue={initialData?.tags}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags}</p>
            )}
          </div>
        )}
        {fields.includes("score") && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="score">{labels.score}</Label>
            <Input
              type="number"
              id="score"
              name="score"
              placeholder="Enter score (0-100)"
              defaultValue={initialData?.score?.toString()}
              min={0}
              max={100}
            />
            {errors.score && (
              <p className="text-red-500 text-sm">{errors.score}</p>
            )}
          </div>
        )}
        {fields.includes("image") && (
          <div
            className={`relative grid w-full gap-2 border-2 border-dotted rounded-lg p-4 transition-all duration-200 ${
              imagePreview ? "justify-start" : "justify-center"
            }`}
          >
            {imagePreview ? (
              <div className="flex items-end gap-2">
                <div className="relative size-20">
                  <Image
                    src={imagePreview}
                    alt="Selected"
                    width={200}
                    height={200}
                    className="object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition-all size-5 flex items-center justify-center"
                  >
                    <X />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  {truncateText(imagePreview.split("/").pop() || "", 20)}
                </p>
              </div>
            ) : (
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center text-gray-600 cursor-pointer"
              >
                <ImageIcon size={32} className="mb-2" />
                <span>{labels.image}</span>
              </label>
            )}

            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        )}
        <Button type="submit" className="w-28 ml-auto">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormLayout;
