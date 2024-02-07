package is442.TicketingSystem.models;

import java.sql.Time;

import java.sql.Date;

import is442.TicketingSystem.models.Customer;

import is442.TicketingSystem.models.Event;

public class EventManager extends Customer{
    

    public EventManager(String email, String password_hash){
        super(email,password_hash);
    }

    public void createEvent(String name, String venue, Date date, Time time, double price, int ticketsAvail){
        ;
    }
    
    public void updateEvent(Event event){
        ;
    }

    public void viewStats(Event event){
        ;
    }

    public void cancelEvent(Event event){
        ;
    }

    public void addTO(String username, String password){
        ;
    }
}
