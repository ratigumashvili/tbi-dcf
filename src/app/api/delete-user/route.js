import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();

        const { id } = body;

        if (!id) {
            return Response.json({ error: "User ID is missing" }, { status: 400 });
        }

        const deletedUser = await prisma.user.delete({
            where: { id },
        });

        return Response.json({ message: "User deleted successfully", user: deletedUser });

    } catch (error) {
        console.error("Delete User API Error:", error.message);
        return Response.json({ error: "Failed to delete user", details: error.message }, { status: 500 });
    }
}
