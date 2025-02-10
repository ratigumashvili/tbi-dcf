// "use client";

// import { useSession } from "next-auth/react";

// export default function HomePage() {
//   const { data: session, status } = useSession();

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <p>Status: {status}</p>
//       <pre>{JSON.stringify(session, null, 2)}</pre>
//     </div>
//   );
// }

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




