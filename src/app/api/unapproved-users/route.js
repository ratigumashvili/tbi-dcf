import { prisma } from "@/app/_utils/db";

export async function GET() {
  const users = await prisma.user.findMany({
    where: { approved: false }, // ❌ Fetch only unapproved users
    select: { id: true, name: true, email: true, approved: true },
  });

  return Response.json(users);
}
