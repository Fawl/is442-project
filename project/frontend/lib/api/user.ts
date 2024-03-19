import { User } from "@/types";

export async function getAllUser() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/user/all",
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + `/user/find?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
      if (response.status === 409) {
        throw new Error(`User already exists!`);
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response; // REMARKS: API ONLY RETURN RESPONSE TEXT
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function createUserByEmail(email: string) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/user/new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password_hash: "temppassword",
          user_type: "customer",
        }),
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating customer account:", error);
    throw error;
  }
}
