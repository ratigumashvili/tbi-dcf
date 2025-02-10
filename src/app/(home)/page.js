import { requireUser } from "@/app/_lib/helpers"

export default async function HomePage() {
  const { data, status } = await requireUser()
  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(status, null, 2)}
      </pre>
    </div>
  )

}




