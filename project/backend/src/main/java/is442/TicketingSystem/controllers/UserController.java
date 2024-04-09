package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.*;
import jakarta.transaction.Transactional;
import is442.TicketingSystem.services.*;
import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository<User> userRepository;

    // OK
    @GetMapping("/all")
    public ResponseEntity<List<User>> findAll(@RequestParam(required = false, defaultValue = "customer,event_manager,ticket_officer") String groups) {
        Set<String> set = new HashSet<>();
        set.addAll(Arrays.asList(groups.split(",")));

        List<User> ls = new ArrayList<>();
        try {

            if (set.contains("customer")) ls.addAll(userRepository.findAllCustomers());
            if (set.contains("event_manager")) ls.addAll(userRepository.findAllEventManagers());
            if (set.contains("ticket_officer")) ls.addAll(userRepository.findAllTicketOfficer());

            return new ResponseEntity<List<User>>(ls, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    // OK
    @GetMapping
    public ResponseEntity<User> findUserAlt(@RequestParam(required = false) String email,
    @RequestParam(required = false) Long id) {
        return findUser(email, id);
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
                userRepository.createUser(user.getEmail(), user.getName(), user.getPassword_hash(), user.getUser_type());
                return new ResponseEntity<>(null, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User request) {
        try {

            User u = userRepository.findFirstByEmail(request.getEmail());

            if (Objects.isNull(u)) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            // else if (!Objects.isNull(customerRepository.findFirstByEmail(request.getEmailAfter()))) {
            //     return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            // } 
            else {
                if (!Objects.isNull(request.getEmail()) && !request.getEmail().equals("") && !u.getEmail().equals(request.getEmail()) ) {
                    u.setEmail(request.getEmail());
                }
                if (!Objects.isNull(request.getName()) && !request.getName().equals("") && !u.getName().equals(request.getName())) {
                    u.setName(request.getName());
                }
                if (!Objects.isNull(request.getPassword_hash()) && !request.getPassword_hash().equals("") && !u.getPassword_hash().equals(request.getPassword_hash())) {
                    u.setPassword_hash(request.getPassword_hash());
                }
                
                if (!Objects.isNull(request.getUser_type()) && (u.getUser_type() != request.getUser_type())) {
                    System.out.printf("User type is diff: %s, %s%n", u.getUser_type(), request.getUser_type() );
                    u.setUser_type(request.getUser_type());
                    userRepository.deleteByEmail(u.getEmail());
                }

                userRepository.save(u);
                return new ResponseEntity<>(u, HttpStatus.OK);

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
}
