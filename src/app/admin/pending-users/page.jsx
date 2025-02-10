

import Link from "next/link"

import { approveUser, deleteUser } from "@/app/actions/server-actions"

export default async function PendingUsersPage() {

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-2">Pending users</h2>
        <Link href={'/admin/all-users'}>All users</Link>
      </div>
      <ul>
        {data && data.length !== 0 && data?.map((user) => (
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
    </>
  )
}
