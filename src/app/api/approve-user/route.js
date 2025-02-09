import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { id } = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { approved: true },
  });

  return Response.json({ message: "User approved!", user: updatedUser });
}
