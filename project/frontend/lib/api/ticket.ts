export async function purchaseTicketByEventIdANDUserId(payload: any) {
  const { eventId, userId, ticketQuantity } = payload;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND +
        `/user/purchase?event_id=${eventId}&user_id=${userId}&qty=${ticketQuantity}`,
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
    console.error("Error purchasing ticket:", error);
    throw error;
  }
}

export async function getTicketPurchaseByEventIdANDUserId(payload: any) {
  const { eventId, userId } = payload;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND +
        `/user/purchase?event_id=${eventId}&user_id=${userId}`,
      {
        method: "GET",
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
    console.error("Error fetching ticket purchase:", error);
    throw error;
  }
}
