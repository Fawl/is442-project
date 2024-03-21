import { toast } from "sonner";
import { createUser, getUserByEmail } from "./user";

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
      console.log(response);
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

export async function issueTicketByTicketOfficer(payload: any) {
  const { eventId, email, ticketQuantity } = payload;

  // GET USER BY EMAIL
  const user = await fetch(
    process.env.NEXT_PUBLIC_BACKEND + `/user/find?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // USER DON'T EXIST
  if (user.status === 404) {
    const newUser = await createUser({
      email: email,
      password_hash: "password",
      user_type: "customer",
    });
  }

  const customer = await getUserByEmail(email);
  console.log(customer);
  console.log(customer.id);
  const userId = customer.id;
  try {
    const ticket = await purchaseTicketByEventIdANDUserId({
      eventId,
      userId,
      ticketQuantity,
    });
    if (ticket) {
      return ticket;
    }
  } catch (error) {
    toast.error("Failed to issue ticket");
  }
}
