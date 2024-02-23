package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.User;
import is442.TicketingSystem.types.usertype;
import jakarta.transaction.Transactional;
import is442.TicketingSystem.services.UserRepository;
import java.util.*;


import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
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
        public List<User> findAll() {
            return userRepository.findAll();
        }

        // Request body only needs to have 1 property [email]
        // Returns user's details if found, else returns null
        @GetMapping("/find")
        public User findUser(@RequestBody User user) {
            return userRepository.findByEmail(user.getEmail());
        }

        // Request body needs to have 3 properties  "email", "password_hash" and "user_type"
        @PostMapping("/new")
        public String createUser(@RequestBody User request) {
            try{
                if (Objects.isNull(findUser(request))){
                    userRepository.save(request);
                    return "Success!";
                }else{
                    return "User already exists";
                }
                
            }catch( Exception e){
                return e.toString();
            }
        }


        // Takes in a list of 2 objects in JSON format
        // First object only requires 1 property [email] to find the row to be changed
        // Second object requires 3 properties [email, password_hash, user_type] to update the row
        // Balance cannot be changed in this function, will be written in separate function
        @PutMapping("/update")
        public String updateUser(@RequestBody List<User> request){
            try{
                User before = request.get(0);
                User after = request.get(1);
                before = findUser(before);
                if (Objects.isNull(before)){
                    return "User does not exist, use '/new' to create one instead";
                }else if(!Objects.isNull(findUser(after))){
                    return "New email already exists under another account";
                }else{
                    after.setId(before.getId());
                    after.setBalance(before.getBalance());
                    userRepository.save(after);
                    return "Success!";
                }
                
            }catch( Exception e){
                return e.toString();
            }
        }

        // Request body only requires 1 property [email]
        // Returns 1 if successful
        // Returns 0 if no such user
        @Transactional
        @DeleteMapping("/delete")
        public String deleteUser(@RequestBody User user) {
            // TODO: May consider only deleting if user provided is valid
            return userRepository.deleteByEmail(user.getEmail());
        }
    
}
