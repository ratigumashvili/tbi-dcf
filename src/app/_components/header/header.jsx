import Link from "next/link";

import { AuthButtons } from "./auth-buttons";

export function Header() {
    return (
        <header className="flex items-center justify-between max-w-7xl mx-auto p-4 md:p-8 lg:p-10 border-b shadow-sm">
            <h1 className="text-2xl font-bold">
                <Link href={'/'}>
                    TBI DCF
                </Link>
            </h1>
            <div className="flex gap-2">
                <Link href={'/register'}>register</Link>
                <AuthButtons />
            </div>
        </header>
    )
}