"use server";
import fs from "fs";
import path from "path";
import { prisma } from "@/prisma";

// ---------------- Project ----------------

// Create a new project
export const createProject = async (formData: FormData) => {
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File | null;
  const tags = formData.get("tags") as string | string[] | null; // Allow both string and string[]
  const content = formData.get("content") as string | number | null; // Allow both string and number

  if (!title || !description || !content) {
    console.error("Missing required fields: title, description, or content");
    return {
      success: false,
      error: "Title, description, and content are required",
    };
  }

  let imagePath: string | null = null;

  // Handling the image upload
  if (imageFile) {
    if (!imageFile.type.startsWith("image/")) {
      console.error("Invalid file type. Only images are allowed.");
      return {
        success: false,
        error: "Invalid file type. Only images are allowed.",
      };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    } catch (err) {
      console.error("Error saving the image file:", err);
      return { success: false, error: "Failed to save image file" };
    }
  }

  // Handling tags and content as strings
  const formattedTags = Array.isArray(tags) ? tags.join(",") : tags || ""; // Convert to comma-separated string if it's an array
  const formattedContent = String(content); // Ensure content is a string (if it's a number, convert it)

  try {
    // Save the project to the database
    await prisma.project.create({
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image: imagePath,
        tags: formattedTags, // Store tags as comma-separated string
        content: formattedContent, // Ensure content is a string
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
