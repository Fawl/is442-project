package is442.TicketingSystem.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import is442.TicketingSystem.models.*;
import is442.TicketingSystem.services.*;
import is442.TicketingSystem.utils.*;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/ticket")
public class TicketOfficerController extends EventController {

	@Autowired
	private TicketRepository ticketRepository;
	@Autowired
    private CustomerRepository customerRepository;

	/**
	 * Creates a Ticket object. purchase_time has to be in the format of
	 * yyyy-MM-ddThh:mm:ss. The T is very important lol.
	 * 
	 * @param Ticket MUST have <b>event_id, user_id, price</b>.
	 * @Optional redeemed, refunded
	 * @return The created ticket object
	 */

	@Transactional
	@PostMapping("/new")
	public ResponseEntity<Map<String, String>> createTicket(@RequestBody NewTicket ticket) {
		ticketRepository.createTicket(
			ticket.getEvent_id(),
			ticket.getUser_id(),
			ticket.getPrice(),
			ticket.isRedeemed(),
			ticket.isRefunded(),
			LocalDateTime.now()
		);

		Customer c = (Customer) customerRepository.findById(ticket.getUser_id()).get();
		c.setBalance(c.getBalance() - ticket.getPrice());
		customerRepository.save(c);

		Event event = eventRepository.findById(ticket.getEvent_id()).get();
		event.decrementTickets();
		eventRepository.save(event);

		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
		.body(Map.of("message", String.format("Success. New Balance for %s: $%.2f", c.getEmail(), c.getBalance())));
	}

	@GetMapping("/user")
	public ResponseEntity<List<Ticket>> findTicketsByUser(@RequestParam Long user_id) {
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(ticketRepository.findByBoughtBy(user_id));
	}

	@GetMapping("/verify")
	public ResponseEntity<Map<String, String>> verifyTicket(@RequestParam int id, @RequestParam(required = false) boolean redeem){
		Ticket t = ticketRepository.findById(id);

		if (Objects.isNull(t)){
			return new ResponseEntity<Map<String, String>>(Map.of("message", "Invalid ticket."), HttpStatus.NOT_FOUND);
		}
		if (t.getRedeemed() || t.getRefunded()){
			return new ResponseEntity<Map<String, String>>(Map.of("message", "Ticket cancelled OR refunded OR used."), HttpStatus.CONFLICT);
		}

		if (redeem) {
			return redeemTicket(t);
		} else {
			return new ResponseEntity<Map<String, String>>(Map.of("message", "Validated."), HttpStatus.OK);
		}
	}
	@GetMapping("/events")
	public ResponseEntity<List<Event>> getEvents(@RequestParam Long toid){
		List<Event> events = eventRepository.findEventsManageableByTicketOfficer(toid);
		if (Objects.isNull(events)){
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND); 
		}
		return new ResponseEntity<List<Event>>(events, HttpStatus.OK);
	}

	private ResponseEntity<Map<String, String>> redeemTicket(Ticket ticket){
		ticket.setRedeemed();
		ticketRepository.save(ticket);
		return new ResponseEntity<Map<String, String>>(Map.of("message", "Redeemed."), HttpStatus.OK);
	}

	
}
