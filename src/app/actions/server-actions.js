"use server"

const { revalidatePath } = require("next/cache");

export const approveUser = async (formData) => {
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

  export const deleteUser = async (formData) => {
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