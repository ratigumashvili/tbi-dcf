"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function TopNavigation({data}) {

    const pathname = usePathname()

    return (
        <nav>
            <ul className="flex gap-2">
                {data.map((item) => (
                    <li key={item.id} className={`${pathname === item.path ? "font-bold" : "font-normal"}`}>
                        <Link href={`${item.path}`}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}