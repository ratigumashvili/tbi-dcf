
import Link from "next/link";
import { getApprovedUsers, getPendingUsers } from "@/app/actions/getUsers";

export default async function AllUsersPage() {

  const users = await getApprovedUsers()
  const pendingUsers = await getPendingUsers()
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-2">Active users</h2>
        <Link href={'/admin/pending-users'}>Pending users</Link>
      </div>
      <pre>
        {JSON.stringify(users, null, 2)}
      </pre>
    </>
  )
}
