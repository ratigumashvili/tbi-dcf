

import Link from "next/link"

import { approveUser, deleteUser } from "@/app/actions/server-actions"
import { getPendingUsers } from "@/app/actions/getUsers"
import { SubmitButton } from "@/app/_components/forms/submit-button"

export default async function PendingUsersPage() {

  const pendingUsers = await getPendingUsers()

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-2">Pending users</h2>
        <Link href={'/admin/all-users'}>All users</Link>
      </div>
      <ul>
        {pendingUsers && pendingUsers.length !== 0 && pendingUsers?.map((user) => (
          <li key={user.id} className="flex justify-between p-2 border-b">
            <span>{user.name} ({user.email})</span>
            <div className="flex gap-2">
              <form action={deleteUser}>
                <input type="hidden" value={user.id} name="userId" />
                <SubmitButton title="Delete" classNames={`bg-red-500 text-white px-3 py-1 rounded`} />
              </form>
              <form action={approveUser}>
                <input type="hidden" value={user.id} name="userId" />
                <SubmitButton title="Approve" classNames={`bg-green-500 text-white px-3 py-1 rounded`} />
              </form>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
