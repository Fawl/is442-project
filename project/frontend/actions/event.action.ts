"use server";
export async function getAllEvent() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/event/all",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      // Handle non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error fetching data:", error);
    throw error; // You might want to rethrow or handle it as needed
  }
}
