package is442.TicketingSystem;

import is442.TicketingSystem.models.User;
import is442.TicketingSystem.models.UserType;
import is442.TicketingSystem.services.UserRepository;

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

        @GetMapping("/all")
        public List<User> findAll() {
            return userRepository.findAll();
        }

        @GetMapping("/find")
        public List<User> findAll() {
            return userRepository.findAll();
        }
        

        @PostMapping("/new")
        public String createUser(@RequestBody User request) {
            try{
                if (request.getUser_type() == "customer" || request.getUser_type() == "ticket_officer" || request.getUser_type() == "event_manager"){
                    userRepository.save(request);
                    return "Success!";
                }else{
                    return "Invalid user type, use ['customer', 'ticket_officer', 'event_manager']";
                }
            }catch( Exception e){
                return e.toString();
            }
        }

        @PutMapping("update")
        public String updateUser(@RequestBody User request){
            try{
                if (request.getUser_type() == "customer" || request.getUser_type() == "ticket_officer" || request.getUser_type() == "event_manager"){
                    userRepository.save(request);
                    return "Success!";
                }else{
                    return "Invalid user type, use ['customer', 'ticket_officer', 'event_manager']";
                }
            }catch( Exception e){
                return e.toString();
            }
        }

        @DeleteMapping
        public String deleteUser(@RequestBody User)
    
}
