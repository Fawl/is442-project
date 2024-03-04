package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.*;
import jakarta.transaction.Transactional;
import is442.TicketingSystem.services.*;
import is442.TicketingSystem.utils.UserType;
import java.util.*;

import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/C")
public class CustomerController {

	@Autowired
	private TicketRepository ticketRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private EventRepository eventRepository;

    @GetMapping("/bookings")
    public ResponseEntity<List<Ticket>> viewBookings(@RequestParam int uid){
        User u = userRepository.findById(uid);
        if (Objects.isNull(u)){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        List<Ticket> tl = ticketRepository.findByBoughtBy(u);
        return new ResponseEntity<>(tl, HttpStatus.OK);
    }

    @GetMapping("/cancel")
    public ResponseEntity<Ticket> cancelTicket(@RequestParam int tid){
        Ticket t = ticketRepository.findById(tid);
        if (Objects.isNull(t)){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        Event e = t.getEvent();
        User u = t.getBoughtBy();
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

        
    }

    @GetMapping("/purchase")
    public ResponseEntity<Ticket> purchaseTicket(@RequestParam int eid, @RequestParam int uid, @RequestParam int qty) {
        System.out.println(eid);
        System.out.println(uid);
        Event e = eventRepository.findById(eid);
        User u = userRepository.findById(uid);
        if (Objects.isNull(u) || Objects.isNull(e)){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (u.getBalance()<e.getPrice() * qty){
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        for (int i=qty; i>0;i--){
            ticketRepository.createTicket(e.getId(),u.getId(),e.getPrice(),false,false,LocalDateTime.now());
        }
        
        u.setBalance(u.getBalance()-e.getPrice()*qty);
        userRepository.save(u);
        e.setNumTickets(e.getNumTickets()-qty);
        eventRepository.save(e);
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    // Returns all users' details in JSON format
    @GetMapping("/all")
    public ResponseEntity<List<User>> findAll() {
        try{
            System.out.println("hi");
            List<User> ul = userRepository.findAll();
            System.out.println(ul);
            return new ResponseEntity<List<User>>(userRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
		}
    }

    // Request body only needs to have 1 property [email]
    // Returns user's details if found, else returns null
    @GetMapping("/find")
    public ResponseEntity<User> findUser(@RequestParam String email) {
        User u = userRepository.findByEmail(email);
        try{
            if (Objects.isNull(u)){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(u, HttpStatus.OK);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    // Request body needs to have 3 properties "email", "password_hash" and
    // "user_type"
    @PostMapping("/new")
    public ResponseEntity<User> createUser(@RequestParam String email, String password_hash, String usertype) {

        try {
            if (Objects.isNull(userRepository.findByEmail(email))) {
                User u = new User();
                u.setEmail(email);
                u.setPassword_hash(password_hash);
                u.setUser_type(UserType.valueOf(usertype.toLowerCase()));
                
                return new ResponseEntity<>(userRepository.save(u), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    // Takes in a list of 2 objects in JSON format
    // First object only requires 1 property [email] to find the row to be changed
    // Second object requires 3 properties [email, password_hash, user_type] to
    // update the row
    // Balance cannot be changed in this function, will be written in separate
    // function
    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestParam String emailBefore, @RequestParam String emailAfter, @RequestParam String password_hash) {
        try {

            User u = userRepository.findByEmail(emailBefore);
            
            if (Objects.isNull(u)) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } else if (!Objects.isNull(userRepository.findByEmail(emailAfter))) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            } else {
                u.setEmail(emailAfter);
                u.setPassword_hash(password_hash);
                return new ResponseEntity<>(userRepository.save(u), HttpStatus.OK);
            
            }

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    // Request body only requires 1 property [email]
    // Returns 1 if successful
    // Returns 0 if no such user
    @Transactional
    @DeleteMapping("/delete")
    public ResponseEntity<User> deleteUser(@RequestParam String email) {
        try{
            String status = userRepository.deleteByEmail(email);
            if (status.equals("0")){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(null, HttpStatus.OK);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

}
