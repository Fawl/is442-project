"use server";
const users = [
  {
    id: "1",
    email: "customer@example.com",
    password_hash: "testtest",
    user_type: "customer",
    balance: 1000,
  },
  {
    id: "2",
    email: "event_manager@example.com",
    password_hash: "testtest",
    user_type: "event_manager",
    balance: 1000,
  },
  {
    id: "3",
    email: "ticker_officer@example.com",
    password_hash: "testtest",
    user_type: "ticket_officer",
    balance: 1000,
  },
];

export const getUserByEmail = async (email: string) => {
  // Search for the user with the provided email
  const user = users.find((user) => user.email === email);
  // Return the user if found, otherwise return null
  return user || null;
};

// export const getUserByEmail = async (email: string) => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND}/user/find?email=${encodeURIComponent(
//         email
//       )}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (!response.ok) {
//       // Handle non-successful responses
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data[0];
//   } catch (error) {
//     // Handle any errors that occurred during the fetch
//     console.error("Error fetching data:", error);
//     throw error; // You might want to rethrow or handle it as needed
//   }
// };

export const createUser = async (payload: any) => {
  console.log(payload);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/user/new`,
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
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
