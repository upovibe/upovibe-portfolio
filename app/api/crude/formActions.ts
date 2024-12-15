"use server";
// import fs from "fs";
// import path from "path";
import { prisma } from "@/prisma";
import { uploadToCloudinary } from "@/config/cloudinary";

// ---------------- Project ----------------

// Create a new project
export const createProject = async (formData: FormData) => {
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File | null;
  const tags = formData.get("tags") as string | string[] | null;
  const content = formData.get("content") as string | number | null;

  if (!title || !description || !content) {
    return {
      success: false,
      error: "Title, description, and content are required",
    };
  }

  let imageUrl: string | null = null;

  // Upload the image to Cloudinary
  if (imageFile) {
    
    if (!imageFile.type.startsWith("image/")) {
      return { success: false, error: "Invalid file type. Only images are allowed." };
    }

    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      imageUrl = await uploadToCloudinary(buffer, "projects");
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      return { success: false, error: "Failed to upload image to Cloudinary" };
    }
  }

  const formattedTags = Array.isArray(tags) ? tags.join(",") : tags || "";
  const formattedContent = String(content);

  try {
    // Save the project to the database
    await prisma.project.create({
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image: imageUrl,
        tags: formattedTags,
        content: formattedContent,
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

// Edit the project
export const editProject = async (formData: FormData, id: string | number) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  const tags = formData.get("tags") as string | null;
  const content = formData.get("content") as string;

  if (!title || !description || !content) {
    return { success: false, error: "Title, description, and content are required" };
  }

  let imageUrl: string | null = null;

  // If there's a new image, upload it to Cloudinary
  if (imageFile && imageFile.size > 0) {
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadToCloudinary(buffer, "projects");
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      return { success: false, error: "Failed to upload new image to Cloudinary" };
    }
  }

  try {
    const parsedId = typeof id === "string" ? id : String(id);
    if (!parsedId) throw new Error("Invalid project ID");

    // Fetch the current project to get the existing image
    const existingProject = await prisma.project.findUnique({
      where: { id: parsedId },
    });
    if (!existingProject) {
      return { success: false, error: "Project not found" };
    }

    // Update the project in the database
    const updatedProject = await prisma.project.update({
      where: { id: parsedId },
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image: imageUrl || existingProject.image, 
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


// ---------------- Skill ----------------

export const createSkill = async (formData: FormData) => {
  const name = formData.get("name") as string | null;
  const scoreValue = formData.get("score"); // It can be a string or null
  const imageFile = formData.get("image") as File | null;

  if (!name || !scoreValue) {
    return { success: false, error: "Name and score are required" };
  }

  // Convert scoreValue to a number
  let score: number;
  if (typeof scoreValue === "string") {
    score = parseInt(scoreValue, 10);
    if (isNaN(score)) {
      return { success: false, error: "Score must be a valid number" };
    }
  } else {
    return { success: false, error: "Score must be a valid number" };
  }

  // Ensure score is between 1 and 100
  if (score < 1 || score > 100) {
    return { success: false, error: "Score must be between 1 and 100" };
  }

  let imageUrl: string | null = null;

  // Upload the image to Cloudinary if available
  if (imageFile) {
    if (!imageFile.type.startsWith("image/")) {
      return { success: false, error: "Invalid file type. Only images are allowed." };
    }

    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadToCloudinary(buffer, "skills");
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      return { success: false, error: "Failed to upload image to Cloudinary" };
    }
  }

  try {
    // Save the skill to the database
    await prisma.skill.create({
      data: {
        name,
        slug: name.replace(/\s+/g, "_").toLowerCase(),
        image: imageUrl,
        score,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating skill:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Edit the skill
export const editSkill = async (formData: FormData, id: string | number) => {
  const name = formData.get("name") as string;
  const scoreValue = formData.get("score"); // It can be a string or null
  const imageFile = formData.get("image") as File | null;

  if (!name || !scoreValue) {
    return { success: false, error: "Name and score are required" };
  }

  // Convert scoreValue to a number
  let score: number;
  if (typeof scoreValue === "string") {
    score = parseInt(scoreValue, 10);
    if (isNaN(score)) {
      return { success: false, error: "Score must be a valid number" };
    }
  } else {
    return { success: false, error: "Score must be a valid number" };
  }

  // Ensure score is between 1 and 100
  if (score < 1 || score > 100) {
    return { success: false, error: "Score must be between 1 and 100" };
  }

  let imageUrl: string | null = null;

  // Fetch the existing skill to get the existing image
  const existingSkill = await prisma.skill.findUnique({
    where: { id: String(id) },
    select: { image: true }, // Only select the image field
  });

  if (!existingSkill) {
    return { success: false, error: "Skill not found" };
  }

  // If there's a new image, upload it to Cloudinary
  if (imageFile && imageFile.size > 0) {
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadToCloudinary(buffer, "skills");
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      return { success: false, error: "Failed to upload new image to Cloudinary" };
    }
  } else {
    // Use the existing image URL if no new image is uploaded
    imageUrl = existingSkill.image;
  }

  try {
    // Update the skill in the database
    const updatedSkill = await prisma.skill.update({
      where: { id: String(id) },
      data: {
        name,
        slug: name.replace(/\s+/g, "_").toLowerCase(),
        image: imageUrl,
        score,
      },
    });

    return { success: true, skill: updatedSkill };
  } catch (error) {
    console.error("Error editing skill:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Delete a skill from the database
export const deleteSkill = async (id: string | number) => {
  try {
    const parsedId = typeof id === "string" ? id : String(id);
    if (!parsedId) throw new Error("Invalid skill ID");

    await prisma.skill.delete({ where: { id: parsedId } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};


// ---------------Contact Link --------------

// Create a contact link
export const createContactLink = async (formData: FormData) => {
  const name = formData.get("name") as string | null;
  const href = formData.get("href") as string | null;
  const imageFile = formData.get("image") as File | null;

  if (!name || !href) {
    return { success: false, error: "Name and href are required" };
  }

  let imageUrl: string | null = null;

  // Upload the image to Cloudinary if available
  if (imageFile) {
    if (!imageFile.type.startsWith("image/")) {
      return { success: false, error: "Invalid file type. Only images are allowed." };
    }

    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadToCloudinary(buffer, "contactLinks");
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      return { success: false, error: "Failed to upload image to Cloudinary" };
    }
  }

  try {
    // Save the contact link to the database
    await prisma.contactLink.create({
      data: {
        name,
        slug: name.replace(/\s+/g, "_").toLowerCase(),
        image: imageUrl,
        href,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating contact link:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Edit a contact link
export const editContactLink = async (formData: FormData, id: string | number) => {
  const name = formData.get("name") as string;
  const href = formData.get("href") as string;
  const imageFile = formData.get("image") as File | null;

  if (!name || !href) {
    return { success: false, error: "Name and href are required" };
  }

  let imageUrl: string | null = null;

  // Fetch the existing contact link to get the existing image
  const existingContactLink = await prisma.contactLink.findUnique({
    where: { id: String(id) },
    select: { image: true }, // Only select the image field
  });

  if (!existingContactLink) {
    return { success: false, error: "Contact link not found" };
  }

  // If there's a new image, upload it to Cloudinary
  if (imageFile && imageFile.size > 0) {
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadToCloudinary(buffer, "contactLinks");
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      return { success: false, error: "Failed to upload new image to Cloudinary" };
    }
  } else {
    // Use the existing image URL if no new image is uploaded
    imageUrl = existingContactLink.image;
  }

  try {
    // Update the contact link in the database
    const updatedContactLink = await prisma.contactLink.update({
      where: { id: String(id) },
      data: {
        name,
        slug: name.replace(/\s+/g, "_").toLowerCase(),
        image: imageUrl,
        href,
      },
    });

    return { success: true, contactLink: updatedContactLink };
  } catch (error) {
    console.error("Error editing contact link:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Delete a contact link from the database
export const deleteContactLink = async (id: string | number) => {
  try {
    const parsedId = typeof id === "string" ? id : String(id);
    if (!parsedId) throw new Error("Invalid contact link ID");

    await prisma.contactLink.delete({ where: { id: parsedId } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting contact link:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};