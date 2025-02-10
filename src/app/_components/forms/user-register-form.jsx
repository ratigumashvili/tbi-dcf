import { SubmitButton } from "./submit-button";
import { registerUser } from "@/app/actions/server-actions";

export function UserRegisterForm() {
    return (
        <form action={registerUser} className="flex flex-col gap-y-4 p-4 border rounded-md max-w-xl" autoComplete="false">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                className="border p-2 rounded-sm"
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                className="border p-2 rounded-sm"
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                className="border p-2 rounded-sm"
            />
            <SubmitButton />
        </form>
    )
}