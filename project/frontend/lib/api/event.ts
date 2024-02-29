export async function getAllEvents() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/event/all",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export async function getEventById(id: string) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + `/event?id=${id}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
}

export async function createEvent(payload: any) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + `/event/new?user_id=${payload.user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}
