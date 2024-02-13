"use server";
const users = [
  {
    id: "1",
    email: "test@example.com",
    password: "testtest",
    user_type: "customer",
    balance: 100,
  },
  {
    id: "2",
    email: "test2@example.com",
    password: "testtest",
    user_type: "event_manager",
    balance: 100,
  },
  {
    id: "3",
    email: "test3@example.com",
    password: "testtest",
    user_type: "ticket_officer",
    balance: 100,
  },
];

export const getUserByEmail = async (email: string) => {
  // Search for the user with the provided email
  const user = users.find((user) => user.email === email);
  // Return the user if found, otherwise return null
  return user || null;
};
