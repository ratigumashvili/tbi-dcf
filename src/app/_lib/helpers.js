import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function requireUser() {
    const data = await getServerSession(authOptions)
    const status = data?.user ? "authenticated" : "unauthenticated"

    return {
        data,
        status
    }
}

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL