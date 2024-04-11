import { toast } from "sonner";
import { createUser, getUserByEmail, getUserById } from "./user";
import { getEventById } from "./event";

export async function purchaseTicketByEventIdANDUserId(payload: any) {
  const { eventId, userId, ticketQuantity } = payload;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND +
        `/customer/purchase?event_id=${eventId}&user_id=${userId}&qty=${ticketQuantity}`,
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
    throw error;
  }
}

export async function getTicketsByUserId(userId: any) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + `/ticket/user?user_id=${userId}`,
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

export async function getTicketPurchaseByEventIdANDUserId(payload: any) {
  const { eventId, userId } = payload;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND +
        `/customer/purchase?event_id=${eventId}&user_id=${userId}`,
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
      name: "",
      email: email,
      password_hash: "Password@888",
      user_type: "customer",
    });
  }

  const customer = await getUserByEmail(email);

  const userId = customer.id;
  try {
    const ticket = await fetch(
      process.env.NEXT_PUBLIC_BACKEND +
        `/customer/purchase?event_id=${eventId}&user_id=${userId}&qty=${ticketQuantity}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const event = await getEventById(eventId);
    const ticketData = await ticket.json();
    if (ticketData) {
      return {
        user: customer,
        event: event,
        subject: "Ticket Purchase for" + event.title,
        ticket: ticketData,
      };
    }
  } catch (error) {
    toast.error("Failed to issue ticket");
    throw new Error("Error issuing ticket");
  }
}

export async function cancelTicketByTicketId(ticketId: any) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND +
        `/customer/ticket/cancel?ticket_id=${ticketId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log("Error cancelling ticket:", error);
    throw error;
  }
}

export async function checkValidity(ticketId:any){
  try{
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND + `/ticket/verify?id=${ticketId}`)
    return response.json();
  }catch(error){
    console.log("Error verifying ticket")
    throw error;
  }
}
export async function redeemValidity(ticketId:any){
  try{
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND + `/ticket/verify?redeem=true&id=${ticketId}`)
    return response.json();
  }catch(error){
    console.log("Error verifying ticket")
    throw error;
  }
}