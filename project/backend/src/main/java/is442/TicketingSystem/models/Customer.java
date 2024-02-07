package is442.TicketingSystem.models;

import is442.TicketingSystem.models.Ticket;

public class Customer extends User {
    
    private double balance = 1000;

    public void buyTicket(Event event, int qty){
        ;
    }

    public Customer(String email, String password_hash){
        super(email, password_hash);
    }

    public double getBalance(){
        return this.balance;
    }

    public void setBalance(double newBalance){
        this.balance = newBalance;
    }

}
