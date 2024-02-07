package is442.TicketingSystem.models;

import is442.TicketingSystem.models.Ticket;

import is442.TicketingSystem.models.Customer;

public class TicketingOfficer extends User {
    
    public TicketingOfficer(String email, String password_hash){
        super(email,password_hash);
    }

    public boolean ticketIsValid(Ticket ticket){
        return false;
    }

    public void purchaseTicket(Customer customer, Ticket ticket){

    }
}
