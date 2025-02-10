import { SubmitButton } from "./submit-button";

export function UserRegisterForm() {

    const handleSubmit = async (formData) => {
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        const body = {
            name,
            email,
            password
        }

        console.log(body)
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-y-4 p-4 border rounded-md max-w-xl" autoComplete="false">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                className="border p-2 rounded-sm"
                // value={formData.name}
                // onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                className="border p-2 rounded-sm"
                // value={formData.email}
                // onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                className="border p-2 rounded-sm"
                // value={formData.password}
                // onChange={handleChange}
            />
            <SubmitButton />
            {/* {message && <p>{message}</p>} */}
        </form>
    )
}