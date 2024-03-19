export async function getAllEvents() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/event/all",
      {
        method: "GET",
        cache: "no-cache",
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
        cache: "no-cache",
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
      process.env.NEXT_PUBLIC_BACKEND +
        `/manager/event/new?user_id=${payload.user_id}`,
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

export async function updateEventById(payload: any) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND +
        `/manager/event/update?id=${payload.id}`,
      {
        method: "PUT",
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
    console.error("Error updating event:", error);
    throw error;
  }
}

export async function cancelEventById(payload: any) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND +
        `/manager/event/cancel?id=${payload.id}`,
      {
        method: "DELETE",
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
    console.error("Error updating event:", error);
    throw error;
  }
}
