import Link from "next/link";

import { AuthButtons } from "@/app/_components/header/auth-buttons";
import { TopNavigation } from "@/app/_components/header/top-navigation";
import { requireUser } from "@/app/_lib/helpers";
import { usersNavigation, adminNavigation, guestNavigation } from "@/app/_lib/constants";

export async function Header() {

    const session = await requireUser()
    const isAdmin = session && session?.data?.user?.isAdmin

    return (
        <header className="flex items-center justify-between max-w-7xl mx-auto p-4 md:p-8 lg:p-10 border-b shadow-sm">
            <h1 className="text-2xl font-bold">
                <Link href={'/'}>
                    TBI CDF
                </Link>
            </h1>
            <div className="flex items-center gap-2">
                <TopNavigation data={session?.data === null ? guestNavigation : isAdmin ? adminNavigation : usersNavigation} />
                <AuthButtons />
            </div>
        </header>
    )
}