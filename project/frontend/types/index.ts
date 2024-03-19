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

export type Event = {
  id: number;
  title: string;
  venue: string;
  numTickets: number;
  startTime: string;
  endTime: string;
  cancelled: boolean;
  imageLink: string;
  price: number;
  cancellationFee: number;
  tickets: number[];
  createdBy: number;
  start: string;
  end: string;
};

export type User = {
  email: string;
  password_hash: string;
  user_type: string;
};
