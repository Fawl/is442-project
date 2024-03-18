export type TicketedEvent = {
  id: number;
  title: string;
  venue: string;
  numTickets: number;
  cancelled?: boolean;
  imageLink?: string;
  price: number;
  start: Date;
  end: Date;
};

export type User = {
  email: string;
  password_hash: string;
  user_type: string;
};
