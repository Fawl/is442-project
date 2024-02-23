export type TicketedEvent = {
    id : number,
    title : string,
    venue : string,
    start : Date,
    end : Date,
    numTickets : number,
    desc? : string,
    imageLink? : string,
    cancelled? : boolean,
}