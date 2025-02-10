import { requireUser } from "@/app/_lib/helpers"
import { redirect } from "next/navigation"

export default async function DataEntry() {
    const { data: user, status } = await requireUser()

    if (!user) return redirect("/sign-in")
    return (
        <div>
            data entry
        </div>
    )
}
