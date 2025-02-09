"use client"

import {signIn, signOut} from "next-auth/react"
import Link from "next/link"

export function AuthButtons () {
    return (
        <>
        <Link href={'/sign-in'}>Sign in</Link>
        <button onClick={signOut}>
            sign out
        </button>
        </>
    )
}