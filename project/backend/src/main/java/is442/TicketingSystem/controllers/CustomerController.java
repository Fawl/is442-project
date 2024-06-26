package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.*;
import jakarta.transaction.Transactional;
import is442.TicketingSystem.services.*;
import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private CustomerRepository customerRepository;

    // OK
    @GetMapping("/bookings")
    public ResponseEntity<List<Ticket>> viewBookings(@RequestParam int uid) {
        Customer c = customerRepository.findById(uid);
        if (Objects.isNull(c)) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        List<Ticket> tl = ticketRepository.findByBoughtBy(c);
        return new ResponseEntity<>(tl, HttpStatus.OK);
    }

    // OK
    @Transactional
    @DeleteMapping("/ticket/cancel")
    public ResponseEntity<Map<String, String>> cancelTicket(@RequestParam int ticket_id) {
        Ticket t = ticketRepository.findById(ticket_id);

        if (Objects.isNull(t)) {
            return new ResponseEntity<Map<String, String>>(Map.of("message", "No ticket found matching ID."),
                    HttpStatus.NOT_FOUND);
        }

        if (LocalDateTime.now().isAfter(t.getEvent().getStartTime().minusDays(2))) {
            return new ResponseEntity<Map<String, String>>(
                    Map.of("message", "Unable to cancel. Reason: T&C Breached (Event will start in 48 hrs)"),
                    HttpStatus.BAD_REQUEST);
        }

        if (t.getRefunded() || t.getRedeemed()) {
            return new ResponseEntity<Map<String, String>>(
                    Map.of("message", "Unable to cancel. Reason: Ticket has been used OR refunded before"),
                    HttpStatus.CONFLICT);
        }

        Event e = t.getEvent();
        Customer c = t.getBoughtBy();
        c.setBalance(c.getBalance() + t.getPrice() - e.getCancellationFee());
        e.setNumTickets(e.getNumTickets() + 1);
        t.setRefunded(true);

        customerRepository.save(c);
        eventRepository.save(e);
        ticketRepository.save(t);
        return new ResponseEntity<Map<String, String>>(Map.of("message", "Cancelled ticket"), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/purchase")
    public ResponseEntity<List<Ticket>> purchaseTicket(@RequestParam int event_id, @RequestParam int user_id,
            @RequestParam(required = false) Integer qty) {
        qty = Objects.isNull(qty) ? 1 : qty;
        
        Event e = eventRepository.findById(event_id);
        Customer c = customerRepository.findById(user_id);
        if (Objects.isNull(c) || Objects.isNull(e)) {
            return ResponseEntity.notFound().build();
        }
        List<Ticket> tl = ticketRepository.findByEventIdAndBoughtBy(event_id , c);
        if (tl.size() + qty > 5){
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }

        if (c.getBalance() < e.getPrice() * qty) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        ArrayList<Ticket> allCreated = new ArrayList<Ticket>();

        for (int i = qty; i > 0; i--) {
            Ticket created = new Ticket();
            created.setBoughtBy(c);
            created.setEvent(e);
            created.setPrice(e.getPrice());
            created.setPurchaseTime(LocalDateTime.now());
            allCreated.add(ticketRepository.save(created));
            // ticketRepository.createTicket(e.getId(), u.getId(), e.getPrice(), false,
            // false, LocalDateTime.now());
        }

        c.setBalance(c.getBalance() - e.getPrice() * qty);
        customerRepository.save(c);
        e.setNumTickets(e.getNumTickets() - qty);
        eventRepository.save(e);
        return ResponseEntity.status(HttpStatus.CREATED).contentType(MediaType.APPLICATION_JSON).body(allCreated);
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getMethodName(@RequestParam Long user_id) {
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                .body(ticketRepository.findByBoughtBy(user_id));
    }

}
