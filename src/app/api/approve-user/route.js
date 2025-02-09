import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email } = await req.json();

  // ✅ Set `approved: true` in database
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { approved: true },
  });

  return Response.json({ message: "User approved!", user: updatedUser });
}
