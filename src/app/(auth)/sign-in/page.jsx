"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { revalidatePage } from "@/app/actions/server-actions";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]); // ✅ Redirect only when session is available

  if (status === "loading") {
    return <p>Loading...</p>; // ✅ Show a loading state before redirect
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      await revalidatePage('/')
      router.replace("/");
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="border p-2 rounded-sm"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="border p-2 rounded-sm"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-sm">
          Sign In
        </button>
      </form>
    </section>
  );
}
