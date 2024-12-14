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
    return {
      success: false,
      error: "Title, description, and content are required",
    };
  }

  let imagePath: string | null = null;

  // Handling the image upload
  if (imageFile) {
    if (!imageFile.type.startsWith("image/")) {
      return {
        success: false,
        error: "Invalid file type. Only images are allowed.",
      };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

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

export const editProject = async (formData: FormData, id: string | number) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  const tags = formData.get("tags") as string | null;
  const content = formData.get("content") as string;

  if (!title || !description || !content) {
    throw new Error("Title, description, and content are required");
  }

  let imagePath: string | null = null;

  if (imageFile && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      return {
        success: false,
        error: "Invalid file type. Only images are allowed.",
      };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    } catch (err) {
      console.error("Error saving the new image file:", err);
      return { success: false, error: "Failed to save new image file" };
    }
  }

  try {
    const parsedId = typeof id === 'string' ? id : String(id);
    if (!parsedId) throw new Error("Invalid project ID");

    // Fetch the current project to get the existing image
    const existingProject = await prisma.project.findUnique({
      where: { id: parsedId },
    });
    if (!existingProject) {
      return { success: false, error: "Project not found" };
    }

    // If no new image is provided, keep the existing image
    const updatedProject = await prisma.project.update({
      where: { id: parsedId },
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image: imagePath || existingProject.image,
        tags: tags || "",
        content,
      },
    });

    return { success: true, project: updatedProject };
  } catch (error) {
    console.error("Error editing project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Delete a project
export const deleteProject = async (id: string | number) => {
  try {
    const parsedId = typeof id === 'string' ? id : String(id);
    if (!parsedId) throw new Error("Invalid project ID");

    await prisma.project.delete({ where: { id: parsedId } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
