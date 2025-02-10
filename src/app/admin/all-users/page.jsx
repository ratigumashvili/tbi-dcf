
import Link from "next/link";

import { getApprovedUsers, getPendingUsers } from "@/app/actions/getUsers";
import { deleteUser } from "@/app/actions/server-actions";

export default async function AllUsersPage() {

  const users = await getApprovedUsers()
  const pendingUsers = await getPendingUsers()
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-2">Active users</h2>
          <Link href={'/admin/pending-users'}>
            Pending users <sup className="bg-red-500 text-white px-2 py-1 rounded-full font-xs">{pendingUsers?.length}</sup>
          </Link>
        </div>

        <div className="grid grid-cols-3 bg-slate-50 text-center">
          <div className="col-span-1 border-l border-t border-r border-b p-2 font-bold text-lg">User name</div>
          <div className="col-span-1 border-t border-b p-2 font-bold text-lg">User email</div>
          <div className="col-span-1 border-t border-b border-l border-r p-2 font-bold text-lg">Action</div>
        </div>

        {users && users.length !== 0 && users?.map((user) => (
          <div key={user.id} className="grid grid-cols-3">
            <div className="col-span-1 border-l border-t border-r border-b p-2">{user.name}</div>
            <div className="col-span-1 border-t border-b p-2">{user.email}</div>
            <div className="col-span-1 border-t border-b border-l border-r p-2">
              <form action={deleteUser} className="flex items-center justify-center">
                <input type="hidden" value={user.id} name="userId" />
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}
