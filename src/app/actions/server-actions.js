"use server"

const { revalidatePath } = require("next/cache");
import bcrypt from "bcrypt";

// import { PrismaClient } from "@prisma/client";
import { baseUrl } from "@/app/_lib/helpers";
import { prisma } from "@/app/_utils/db";

// const prisma = new PrismaClient({
//   log: ["query", "info", "warn", "error"]
// });

export const registerUser = async (formData) => {
  try {
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim().toLowerCase();
    const password = formData.get("password");

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "User with this email already exists", status: 409 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        approved: false,
        isAdmin: false,
      },
    });

    return { success: true, message: "User registered successfully", status: 201 };

  } catch (error) {
    return { success: false, error: "Something went wrong. Please try again.", status: 500 };
  }
};

export const approveUser = async (formData) => {
  const userId = formData.get("userId");

  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await fetch(`${baseUrl}/api/approve-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("API Error Response:", responseData);
      throw new Error(responseData.error || "Failed to approve user");
    }

    revalidatePath('/admin')

    return responseData;
  } catch (error) {
    console.error("Approve User Error:", error.message);
    throw new Error("Something went wrong while approving the user");
  }
};

export const deleteUser = async (formData) => {
  const userId = formData.get("userId");

  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await fetch(`${baseUrl}/api/delete-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });
    const responseData = await response.json();


    if (!response.ok) {
      throw new Error(responseData.error || "Failed to delete user");
    }

    revalidatePath("/admin");

    return responseData;

  } catch (error) {
    console.error("Delete User Error:", error.message);
    throw new Error("Something went wrong while deleting the user");
  }
};

export async function revalidatePage(path) {
  revalidatePath(path);
}