package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.*;
import jakarta.transaction.Transactional;
import is442.TicketingSystem.services.*;
import is442.TicketingSystem.utils.*;
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
@RequestMapping("/user")
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
        if (LocalDateTime.now().isAfter(t.getEvent().getStartTime().minusDays(2))){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        if (Objects.isNull(t)){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (t.getRefunded() || t.getRedeemed()){
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        Event e = t.getEvent();
        User u = t.getBoughtBy();
        u.setBalance(u.getBalance() + t.getPrice() - e.getCancellationFee());
        e.setNumTickets(e.getNumTickets() + 1);
        t.setRefunded(true);

        userRepository.save(u);
        eventRepository.save(e);
        ticketRepository.save(t);
        return new ResponseEntity<>(null, HttpStatus.OK);

        
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

    @PostMapping("/new")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        try {
            if (Objects.isNull(userRepository.findByEmail(user.getEmail()))) {
                return new ResponseEntity<>(userRepository.save(user), HttpStatus.CREATED);
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

            User u = userRepository.findByEmail(request.getEmailBefore());
            
            if (Objects.isNull(u)) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } else if (!Objects.isNull(userRepository.findByEmail(request.getEmailAfter()))) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            } else {
                u.setEmail(request.getEmailAfter());
                u.setPassword_hash(request.getPassword_hash());
                u.setUser_type(request.getUser_type());
                return new ResponseEntity<>(userRepository.save(u), HttpStatus.OK);
            
            }

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

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
