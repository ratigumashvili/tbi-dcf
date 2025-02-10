"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function AuthButtons() {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="ml-4 flex gap-2">
      {status === "authenticated" ? (
        <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
          Sign Out
        </button>
      ) : (
        <>
          <Link href="/register" className="bg-blue-500 text-white px-4 py-2 rounded">
            Register
          </Link>
          <Link href="/sign-in" className="bg-green-500 text-white px-4 py-2 rounded">
            Sign In
          </Link>
        </>
      )}
    </div>
  );
}
