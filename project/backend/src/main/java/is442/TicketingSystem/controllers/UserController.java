package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.User;
import jakarta.transaction.Transactional;
import is442.TicketingSystem.services.UserRepository;
import is442.TicketingSystem.utils.usertype;
import java.util.*;

import org.apache.catalina.connector.Response;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Returns all users' details in JSON format
    @GetMapping("/all")
    public ResponseEntity<List<User>> findAll() {
        try{
            return new ResponseEntity<List<User>>(userRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
		}
    }

    // Request body only needs to have 1 property [email]
    // Returns user's details if found, else returns null
    @GetMapping("/find")
    public ResponseEntity<User> findUser(@RequestBody User request) {
        User u = userRepository.findByEmail(request.getEmail());
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
    public ResponseEntity<User> createUser(@RequestBody User request) {
        try {
            if (findUser(request).getStatusCode().toString().equals("404 NOT_FOUND")) {
                return new ResponseEntity<>(userRepository.save(request), HttpStatus.CREATED);
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
    public ResponseEntity<User> updateUser(@RequestBody List<User> request) {
        try {
            User before = request.get(0);
            User after = request.get(1);
            before = findUser(before).getBody();
            if (Objects.isNull(before)) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } else if (findUser(after).getStatusCode().toString().equals("200 OK")) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            } else {
                after.setId(before.getId());
                after.setBalance(before.getBalance());
                return new ResponseEntity<>(userRepository.save(after), HttpStatus.OK);
            
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
    public ResponseEntity<User> deleteUser(@RequestBody User request) {
        try{
            String status = userRepository.deleteByEmail(request.getEmail());
            if (status.equals("0")){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(null, HttpStatus.OK);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

}
