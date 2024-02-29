export async function getUserByEmail(email: string) {
  console.log("api", email);
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
