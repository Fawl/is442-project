package is442.TicketingSystem;

import is442.TicketingSystem.models.Event;
import is442.TicketingSystem.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/event")
@Service
public class EventController {

	@Autowired
	private EventService eventService;

	@GetMapping
	public List<Event> findAll(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate before, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate after) {

		if (Objects.nonNull(after)) {
			// get after
		}

		if (Objects.nonNull(before)) {
			// from above, get before
		}

		return eventService.findAll();
	}


	// create a Event
	@ResponseStatus(HttpStatus.CREATED) // 201
	@PostMapping
	public Event create(@RequestBody Event Event) {
		return eventService.save(Event);
	}

	// update a Event
	@PutMapping
	public Event update(@RequestBody Event Event) {
		return eventService.save(Event);
	}
	

	@GetMapping("/after/{date}")
	public List<Event> findByPublishedDateAfter(
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		return eventService.findByOngoingEvents(date);
	}

}
