package is442.TicketingSystem.services;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import is442.TicketingSystem.models.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

	// Refer to https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html
	List<Event> findByTitle(String title);

	List<Event> findByStartTimeAfterAndEndTimeBefore(LocalDate start, LocalDate end);

	// List<Event> findAllOrderByPrice();

	// Custom query
    // FUCKING SHIT
	@Query(value = "SELECT * FROM \"Events\" e WHERE e.end_time <= :date", nativeQuery = true)
    List<Event> findByOngoingEvents(@Param("date") LocalDate date);
}
