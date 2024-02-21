package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.Event;
import is442.TicketingSystem.models.Ticket;
import is442.TicketingSystem.services.EventRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@RestController
@RequestMapping("/event")
public class EventController {

	private final EventRepository eventRepository;
	public EventController(EventRepository eventRepository) {
		this.eventRepository = eventRepository;
	}

	@GetMapping("/all")
	public List<Event> findAll() {
		return eventRepository.findAll();
	}

	// TODO: Might need to consider getting registerable events OR future events, unless its done by frontend ofc
	// This one is just taking within 6 months of RIGHT NOW or within 6 months of starting datetime
	@GetMapping
	public List<Event> findOngoing(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss") LocalDateTime before, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss") LocalDateTime after) {
		if (Objects.isNull(after)) {
			after = LocalDateTime.now();
		}

		if (Objects.isNull(before)) {
			before = after.plusMonths(6);
		}

		return eventRepository.findByStartTimeAfterAndEndTimeBeforeAndCancelledFalse(after, before);
	}

	/**
	* Creates an Event object. start & end has to be in the format of yyyy-MM-ddThh:mm:ss. The T is very important lol.
	* @param Event MUST have <b>title, venue, start, end, numTickets</b>.
	* @Optional imageLink, cancelled
	* @return      The created event object
	*/
	@PostMapping("/new")
	public ResponseEntity<Event> create(@RequestBody Event Event) {
		try {
			return new ResponseEntity<Event>(eventRepository.save(Event), HttpStatus.CREATED);
			// if (eventRepository.findById(Event.getId()).isPresent()) {
			// 	throw new ResponseStatusException(HttpStatus.CONFLICT, "Event with ID" + Event.getId() + "is already present\n" + Event.toString());
			// } else {
			// }
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shit aint work: "+ e.getMessage());
		}
	}

	// update a Event
	@PutMapping
	public Event update(@RequestBody Event Event) {
		return eventRepository.save(Event);
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

	@GetMapping("/{id}")
	public Optional<Event> getEvent(@RequestParam long id) {
		return eventRepository.findById(id);
	}

	@GetMapping("/{id}/tickets")
	public List<Ticket> getValidTickets(@PathVariable long id) {
		Event event = eventRepository.findById(id).orElse(null);
		return event.getTickets();
	}
	
}
