package is442.TicketingSystem.controllers;

import is442.TicketingSystem.models.*;
import is442.TicketingSystem.services.*;

import org.springframework.beans.factory.annotation.Autowired;
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

	@Autowired
	protected EventRepository eventRepository;

	// ALL ?
	@GetMapping("/all")
	public ResponseEntity<List<Event>> getAll(@RequestParam(required = false) Long id) {
		if (Objects.isNull(id)) {
			return ResponseEntity.ok(eventRepository.findAll());
		} else {
			try {
				return ResponseEntity.ok(eventRepository.findByCreatedBy(id));
			} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shit aint work: " + e.getMessage());
			}
		}
	}

	// ALL
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

	// ALL
	@GetMapping("/{date}")
	public List<Event> findByPublishedDateAfter(
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDateTime date) {
		return eventRepository.findByOngoingEvents(date);
	}

	// er fuck it
	@GetMapping
	public ResponseEntity<Optional<Event>> getEvent(@RequestParam long id) {
		Optional<Event> res = eventRepository.findById(id);
		return new ResponseEntity<Optional<Event>>(res, res.isPresent() ? HttpStatus.FOUND : HttpStatus.GONE);
	}

}


