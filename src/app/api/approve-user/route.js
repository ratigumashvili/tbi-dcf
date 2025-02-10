import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            console.error("Missing userId in request body");
            return Response.json({ error: "User ID is missing" }, { status: 400 });
        }

        console.log(`Approving user with ID: ${userId}`);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { approved: true },
        });

        console.log("User Approved Successfully:", updatedUser);
        return Response.json({ message: "User approved successfully", user: updatedUser });
    } catch (error) {
        console.error("Approve User API Error:", error);
        return Response.json({ error: "Failed to approve user", details: error.message }, { status: 500 });
    }
}
