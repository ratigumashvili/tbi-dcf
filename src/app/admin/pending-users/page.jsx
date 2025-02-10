

import { baseUrl, requireUser } from "@/app/_lib/helpers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export default async function PendingUsersPage() {
  const { data } = await requireUser()

  if (!data || !data?.user?.isAdmin) {
    return redirect('/')
  }

  const getPendingUsers = async () => {
    const response = await fetch(`${baseUrl}/api/unapproved-users`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }
    return response.json()
  }

  const approveUser = async (formData) => {
    "use server"
    const userId = formData.get("userId");

    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await fetch(`${baseUrl}/api/approve-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", responseData);
        throw new Error(responseData.error || "Failed to approve user");
      }

      revalidatePath('/admin')

      return responseData;
    } catch (error) {
      console.error("Approve User Error:", error.message);
      throw new Error("Something went wrong while approving the user");
    }
  };

  const deleteUser = async (formData) => {
    "use server"
    const userId = formData.get("userId");

    if (!userId) {
        throw new Error("User ID is required");
    }

    try {
        const response = await fetch(`${baseUrl}/api/delete-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId }),
        });
        const responseData = await response.json();


        if (!response.ok) {
            throw new Error(responseData.error || "Failed to delete user");
        }

        revalidatePath("/admin");

        return responseData;

    } catch (error) {
        console.error("Delete User Error:", error.message);
        throw new Error("Something went wrong while deleting the user");
    }
};

  const pendingUsers = await getPendingUsers()

  return (
    <section>
      <ul>
        {pendingUsers.map((user) => (
          <li key={user.id} className="flex justify-between p-2 border-b">
            <span>{user.name} ({user.email})</span>
            <div className="flex gap-2">
              <form action={deleteUser}>
                <input type="hidden" value={user.id} name="userId" />
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </form>
              <form action={approveUser}>
                <input type="hidden" value={user.id} name="userId" />
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
