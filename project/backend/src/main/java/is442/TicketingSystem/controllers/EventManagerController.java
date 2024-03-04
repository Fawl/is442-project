package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.*;
import is442.TicketingSystem.services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import is442.TicketingSystem.utils.utils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/EM")
public class EventManagerController {

	@Autowired
	private EventRepository eventRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TicketRepository ticketRepository;

	@GetMapping("/all")
	public List<Event> findAll() {
		return eventRepository.findAll();
	}


	@GetMapping("/cancel")
	public ResponseEntity<Event> cancelEvent(@RequestParam int eid){
		Event e = eventRepository.findById(eid);
		if (Objects.isNull(e)){
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

		if (e.getCancelled()){
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
		e.setCancelled(true);
		eventRepository.save(e);

		List<Ticket> tl = ticketRepository.findByEventId(eid);
		for (Ticket t : tl){

			User u = t.getBoughtBy();
			u.setBalance(u.getBalance() + t.getPrice());
			userRepository.save(u);
			t.setRefunded(true);
			ticketRepository.save(t);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);

	}
	// TODO: Might need to consider getting registerable events OR future events,
	// unless its done by frontend ofc
	// This one is just taking within 6 months of RIGHT NOW or within 6 months of
	// starting datetime
	@GetMapping("/dates")
	public List<Event> findOngoing(
			@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-ddThh:mm:ss") LocalDateTime before,
			@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-ddThh:mm:ss") LocalDateTime after) {
		if (Objects.isNull(after)) {
			after = LocalDateTime.now();
		}

		if (Objects.isNull(before)) {
			before = after.plusMonths(6);
		}

		return eventRepository.findByStartTimeAfterAndEndTimeBeforeAndCancelledFalse(after, before);
	}

	/**
	 * Creates an Event object. start & end has to be in the format of
	 * yyyy-MM-ddThh:mm:ss. The T is very important lol.
	 * 
	 * @param Event MUST have <b>title, venue, start, end, numTickets, price</b>.
	 * @Optional imageLink, cancelled
	 * @return The created event object
	 */
	@PostMapping("/new")
	public ResponseEntity<Event> create(@RequestBody Event Event, @RequestParam Long user_id) {
		try {
			if (Objects.isNull(Event.getImageLink())) {
				Event.setImageLink(utils.getRandomImage());
			}

			Event.setCreatedBy(userRepository.findById(user_id).get());
			return new ResponseEntity<Event>(eventRepository.save(Event), HttpStatus.CREATED);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shit aint work: " + e.getMessage());
		}
	}

	// update a Event
	@PutMapping("/update")
	public ResponseEntity<Event> update(@RequestBody Event Event, @RequestParam long event_id) {
		if (Event.getId() != event_id) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Mismatch Event Id");
		}
		Event existingEvent = eventRepository.findById(Event.getId()).get();
		Event.setCreatedBy(existingEvent.getCreatedBy());

		// TODO: UPDATE ONLY BASED ON WHAT IS BEING SENT
		return new ResponseEntity<Event>(eventRepository.save(Event), HttpStatus.OK);
	}

	@GetMapping("/{date}")
	public List<Event> findByPublishedDateAfter(
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDateTime date) {
		return eventRepository.findByOngoingEvents(date);
	}

	@GetMapping("/old")
	public List<Event> getPastEvents() {
		return eventRepository.findByEndTimeBefore(LocalDateTime.now());
	}

	@GetMapping("find")
	public ResponseEntity<Optional<Event>> getEvent(@RequestParam long id) {
		Optional<Event> res = eventRepository.findById(id);
		return new ResponseEntity<Optional<Event>>(res, res.isPresent() ? HttpStatus.FOUND : HttpStatus.GONE);
	}

	@GetMapping("/tickets")
	public ResponseEntity<List<Ticket>> getValidTickets(@RequestParam long id) {
		Event event = eventRepository.findById(id).orElse(null);
		if (Objects.isNull(event)){
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(event.getTickets(), HttpStatus.OK);
	}

	@PutMapping("/cancellation_fee")
		public ResponseEntity<Event> setCancellationFee(@RequestParam int eid, @RequestParam float fee){
			Event e = eventRepository.findById(eid);
			if (Objects.isNull(e)){
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			e.setCancellationFee(fee);
			
			return new ResponseEntity<>(eventRepository.save(e), HttpStatus.OK);
		}
	}


