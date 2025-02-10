import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const approvedUsers = await prisma.user.findMany({
            where: { approved: true },
            select: {
                id: true,
                name: true,
                email: true,
                approved: true,
            },
        });
        return Response.json(approvedUsers);
    } catch (error) {
        console.error("❌ Error fetching approved users:", error.message);
        return Response.json({ error: "Failed to fetch approved users", details: error.message }, { status: 500 });
    }
}
