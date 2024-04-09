package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.*;
import is442.TicketingSystem.services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import is442.TicketingSystem.utils.*;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Map;


@RestController
@RequestMapping("/manager/event")
public class EventManagerController extends EventController {

	@Autowired
	private TicketRepository ticketRepository;
	@Autowired
	private EventManagerRepository eventManagerRepository;
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired TicketOfficerRepository ticketOfficerRepository;

	@Transactional
	@DeleteMapping("/cancel")
	public ResponseEntity<Map<String, String>> cancelEvent(@RequestParam int id){
		Event e = eventRepository.findById(id);
		if (Objects.isNull(e)){
			return new ResponseEntity<Map<String, String>>(Map.of("message", String.format("Event with id: %d NOT FOUND", id)), HttpStatus.NOT_FOUND);
		}

		if (e.getCancelled()){
			return new ResponseEntity<Map<String, String>>(Map.of("message", String.format("Event with id: %d HAS BEEN CANCELLED ALREADY", id)), HttpStatus.CONFLICT);
		}
		e.setCancelled(true);
		eventRepository.save(e);

		List<Ticket> tl = ticketRepository.findByEventId(id);
		for (Ticket ticket : tl){
			Customer c = ticket.getBoughtBy();
			c.setBalance(c.getBalance() + ticket.getPrice());
			customerRepository.save(c);
			ticket.setRefunded(true);
		}
		ticketRepository.saveAllAndFlush(tl);
		
		return new ResponseEntity<Map<String, String>>(
			Map.of("message", String.format("Event with id: %d deleted. Total tickets refunded: %d ", id, tl.size())),
			HttpStatus.OK);

	}

	/**
	 * Creates an Event object. start & end has to be in the format of
	 * yyyy-MM-ddThh:mm:ss. The T is very important lol.
	 * 
	 * @param Event MUST have <b>title, venue, start, end, numTickets, price</b>.
	 * @Optional imageLink, cancelled
	 * @return The created event object
	 */
	@Transactional
	@PostMapping("/new")
	public ResponseEntity<Event> create(@RequestBody Event Event, @RequestParam Long user_id) {
		try {
			if (Objects.isNull(Event.getImageLink())) {
				Event.setImageLink(utils.getRandomImage());
			}

			Event.setCreatedBy(eventManagerRepository.findById(user_id).get());
			return new ResponseEntity<Event>(eventRepository.save(Event), HttpStatus.CREATED);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shit aint work: " + e.getMessage());
		}
	}

	// update a Event
	@Transactional
	@PutMapping("/update")
	public ResponseEntity<Event> update(@RequestBody Event Event, @RequestParam long id) {
		if (Event.getId() != id) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Mismatch Event Id");
		}
		Event existingEvent = eventRepository.findById(Event.getId()).get();
		Event.setCreatedBy(existingEvent.getCreatedBy());

		// TODO: UPDATE ONLY BASED ON WHAT IS BEING SENT
		return new ResponseEntity<Event>(eventRepository.save(Event), HttpStatus.OK);
	}

	@GetMapping("/old")
	public List<Event> getPastEvents() {
		return eventRepository.findByEndTimeBefore(LocalDateTime.now());
	}

	@GetMapping("/tickets")
	public ResponseEntity<List<Ticket>> getValidTickets(@RequestParam long event_id) {
		Event event = eventRepository.findById(event_id).orElse(null);
		if (Objects.isNull(event)){
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(event.getTickets(), HttpStatus.OK);
	}

	@Transactional
	@PutMapping("/cancellation_fee")
	public ResponseEntity<Event> setCancellationFee(@RequestParam int id, @RequestParam float fee){
		Event e = eventRepository.findById(id);
		if (Objects.isNull(e)){
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		e.setCancellationFee(fee);
		
		return new ResponseEntity<>(eventRepository.save(e), HttpStatus.OK);
	}

	@GetMapping("/owned") // Simple test to get all events created by a manager
	public ResponseEntity<List<Event>> getEvents(@RequestParam int emid){
		EventManager em = eventManagerRepository.findById(emid);
		return new ResponseEntity<>(em.getEvents(), HttpStatus.OK);
	}

	@GetMapping("officers")
	public ResponseEntity<List<TicketOfficer>> getOfficersByManager(@RequestParam Long emid){
		List<TicketOfficer> tolist = ticketOfficerRepository.findTicketOfficersByEventManager(emid);
		if (Objects.isNull(tolist)){
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND); 
		}
		return new ResponseEntity<List<TicketOfficer>>(tolist, HttpStatus.OK);
	}
}


