
"use client"

import { useState, useEffect } from "react"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        const data = await res.json();
        setMessage(data.message || data.error);
        setFormData({
            name: "",
            email: "",
            password: ""
        })
    }

    useEffect(() => {
        if(message !== "") {
            setTimeout(() => {
                setMessage("")
            }, 5000)
        }
    }, [handleSubmit])

    return (
        <section>
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 p-4 border rounded-md max-w-xl" autoComplete="false">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border p-2 rounded-sm"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="border p-2 rounded-sm"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="border p-2 rounded-sm"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button className="bg-green-700 text-white w-max px-3 py-2 rounded-md">Submit</button>
                {message && <p>{message}</p>}
            </form>
        </section>
    )
}