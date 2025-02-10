
import bcrypt from "bcrypt";

import { prisma } from "@/app/_utils/db";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        approved: false,
      },
    });

    return Response.json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
