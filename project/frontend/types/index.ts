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
