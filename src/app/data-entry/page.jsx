import { requireUser } from "@/app/_lib/helpers"
import { redirect } from "next/navigation"

export default async function DataEntry() {
    const { data, status } = await requireUser()

    if (!data) return redirect("/sign-in")
    return (
        <div>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(status, null, 2)}
            </pre>
        </div>
    )
}
