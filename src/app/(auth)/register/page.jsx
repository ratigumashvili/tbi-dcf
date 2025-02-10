import { UserRegisterForm } from "@/app/_components/forms/user-register-form"

export default function RegisterPage() {
    return (
        <section>
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <UserRegisterForm />
        </section>
    )
}