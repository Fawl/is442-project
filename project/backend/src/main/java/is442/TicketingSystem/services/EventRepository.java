package is442.TicketingSystem.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import is442.TicketingSystem.models.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

	// Refer to
	// https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html
	List<Event> findByTitle(String title);

	Event findById(int id);

	@Query(value = "SELECT * FROM \"ticketedevent\" e WHERE e.created_by = :createdBy", nativeQuery = true)
	List<Event> findByCreatedBy(@Param("createdBy") Long createdBy);

	List<Event> findByStartTimeAfterAndEndTimeBeforeAndCancelledFalse(LocalDateTime start, LocalDateTime end);

	// List<Event> findAllOrderByPrice();

	List<Event> findByEndTimeBefore(LocalDateTime end);

	List<Event> findByEndTimeBeforeAndCancelledFalse(LocalDateTime end);

	// Custom query
	// FUCKING SHIT
	@Query(value = "SELECT * FROM \"ticketedevent\" e WHERE e.end_time <= :date and e.cancelled = false ", nativeQuery = true)
	List<Event> findByOngoingEvents(@Param("date") LocalDateTime date);

	@Query(value = "SELECT e.* FROM ticketedevent e " +
	"JOIN event_can_manage em ON e.id = em.event_id " +
	"JOIN ticket_officer_event_manager toem ON em.user_id = toem.event_manager_id " +
	"WHERE toem.ticket_officer_id = :toid", nativeQuery = true)
	List<Event> findEventsManageableByTicketOfficer(@Param("toid") Long toid);


}
