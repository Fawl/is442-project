import { User } from "@/types";

export async function getUserByEmail(email: string) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/user/find",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function createUser(user: User) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/user/new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response}`);
    }

    return response; // REMARKS: API ONLY RETURN RESPONSE TEXT
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
