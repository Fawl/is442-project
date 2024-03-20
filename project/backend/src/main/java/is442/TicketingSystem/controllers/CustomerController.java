package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.*;
import jakarta.transaction.Transactional;
import is442.TicketingSystem.services.*;
import is442.TicketingSystem.utils.*;
import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/user")
public class CustomerController {

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private UserRepository userRepository;
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

        userRepository.save(c);
        eventRepository.save(e);
        ticketRepository.save(t);
        return new ResponseEntity<Map<String, String>>(Map.of("message", "Cancelled ticket"), HttpStatus.OK);
    }

    // TODO: CHECK FIRST IF 4 TICKETS HAVE BEEN PURCHASED TO THE SAME EVENT
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
        userRepository.save(c);
        e.setNumTickets(e.getNumTickets() - qty);
        eventRepository.save(e);
        return ResponseEntity.status(HttpStatus.CREATED).contentType(MediaType.APPLICATION_JSON).body(allCreated);
    }

    // OK
    @GetMapping("/all")
    public ResponseEntity<List<User>> findAll() {
        try {
            return new ResponseEntity<List<User>>(userRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    // OK
    @GetMapping("/find")
    public ResponseEntity<User> findUser(@RequestParam(required = false) String email,
            @RequestParam(required = false) Long id) {
        User u = null;
        if (!Objects.isNull(id)) {
            u = userRepository.findById(id).get();
        } else if (!Objects.isNull(email)) {
            u = userRepository.findFirstByEmail(email);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: No Email or ID provided.");
        }

        try {
            if (Objects.isNull(u)) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(u, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    // OK
    // TODO: Only allow Event Managers to create Ticket Officers???
    @PostMapping("/new")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            if (Objects.isNull(userRepository.findFirstByEmail(user.getEmail()))) {
                userRepository.createUser(user.getEmail(), user.getPassword_hash(), user.getUser_type());
                return new ResponseEntity<>(null, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody UpdateUserRequest request) {
        try {

            User u = userRepository.findFirstByEmail(request.getEmailBefore());

            if (Objects.isNull(u)) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } else if (!Objects.isNull(userRepository.findFirstByEmail(request.getEmailAfter()))) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            } else {
                if (!Objects.isNull(request.getEmailAfter()) && !request.getEmailAfter().equals("")) {
                    u.setEmail(request.getEmailAfter());
                }
                if (!Objects.isNull(request.getPassword_hash()) && !request.getPassword_hash().equals("")) {
                    u.setPassword_hash(request.getPassword_hash());
                }
                if (!Objects.isNull(request.getUser_type())) {
                    u.setUser_type(request.getUser_type());
                }
                return new ResponseEntity<>(userRepository.save(u), HttpStatus.OK);

            }

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    @Transactional
    @DeleteMapping("/delete")
    public ResponseEntity<User> deleteUser(@RequestParam String email) {
        try {
            String status = userRepository.deleteByEmail(email);
            if (status.equals("0")) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getMethodName(@RequestParam Long user_id) {
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                .body(ticketRepository.findByBoughtBy(user_id));
    }

}
