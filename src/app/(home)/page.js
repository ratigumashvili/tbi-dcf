// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ FIXED Import

// export default async function Home() {
//   const session = await getServerSession(authOptions);

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <pre>{JSON.stringify(session, null, 2)}</pre>
//     </div>
//   );
// }

"use client";

import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Status: {status}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}




