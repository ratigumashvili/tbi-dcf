"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  // 1️⃣ Redirect unauthorized users
  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user.isAdmin) {
      router.replace("/"); // 🚨 Non-admins get redirected
    }
  }, [session, status, router]);

  // 2️⃣ Fetch unapproved users
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/unapproved-users");
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  // 3️⃣ Approve user
  const handleApprove = async (id) => {
    await fetch("/api/approve-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setUsers(users.filter((user) => user.id !== id));
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Approve pending users</p>

      <div className="mt-4">
        {users.length === 0 ? (
          <p>No pending users.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id} className="flex justify-between p-2 border-b">
                <span>{user.name} ({user.email})</span>
                <button 
                  onClick={() => handleApprove(user.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
