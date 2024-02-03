package is442.TicketingSystem;

import is442.TicketingSystem.models.Event;
import is442.TicketingSystem.services.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/event")
public class EventController {

	private final EventRepository eventRepository;
	public EventController(EventRepository eventRepository) {
		this.eventRepository = eventRepository;
	}

	@GetMapping
	public List<Event> findAll(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate before, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate after) {
		if (Objects.isNull(after)) {
			after = LocalDate.now();
		}

		if (Objects.isNull(before)) {
			before = after.plusMonths(6);
		}

		return eventRepository.findByStartTimeAfterAndEndTimeBefore(after, before);
		// return eventRepository.findAll();
	}


	// create a Event
	@PostMapping
	public ResponseEntity<Event> create(@RequestBody Event Event) {
		if (eventRepository.findById(Event.getId()).isPresent()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Event with ID" + Event.getId() + "is already present\n" + Event.toString());
		} else {
			return new ResponseEntity<Event>(eventRepository.save(Event), HttpStatus.CREATED);
		}
	}

	// update a Event
	@PutMapping
	public Event update(@RequestBody Event Event) {
		return eventRepository.save(Event);
	}

	@GetMapping("/{date}")
	public List<Event> findByPublishedDateAfter(
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		return eventRepository.findByOngoingEvents(date);
	}

}
