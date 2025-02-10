
import bcrypt from "bcrypt";

import { prisma } from "@/app/_utils/db";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // 1️⃣ Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // 2️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // ✅ Store hashed password
        approved: false, // User needs admin approval
      },
    });

    return Response.json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
