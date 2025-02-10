import { baseUrl } from "@/app/_lib/helpers";

 export const getApprovedUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/approved-users`);
      const data = await response.json();
      if (!response.ok) throw new Error("Failed to fetch approved users");
      return data
    } catch (error) {
      console.error("Error fetching approved users:", error);
      return []
    }
  };

  export const getPendingUsers = async () => {
    const response = await fetch(`${baseUrl}/api/unapproved-users`, {
        cache: "no-store",
    })

    if (!response.ok) {
        throw new Error("Failed to fetch users")
    }
    return response.json()
}