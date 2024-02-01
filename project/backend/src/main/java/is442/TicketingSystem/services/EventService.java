package is442.TicketingSystem.services;
import is442.TicketingSystem.models.Event;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EventService extends JpaRepository<Event, Long> {
	// Refer to https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html
	List<Event> findByTitle(String title);

	List<Event> findByStart_timeAfterAndEnd_timeBefore(LocalDate start, LocalDate end);

	Event save(Event event);

	// List<Event> findAllOrderByPrice();

	// Custom query
	@Query("SELECT b FROM Event b WHERE b.end_date < :date")
	List<Event> findByOngoingEvents(@Param("date") LocalDate date);

}

