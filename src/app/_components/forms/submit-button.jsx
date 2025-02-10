"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <button className="bg-green-700 text-white w-max px-3 py-2 rounded-md opacity-50 pointer-events-none">Pending...</button>
            ) : (
                <button className="bg-green-700 text-white w-max px-3 py-2 rounded-md">Submit</button>
            )}

        </>
    )
}