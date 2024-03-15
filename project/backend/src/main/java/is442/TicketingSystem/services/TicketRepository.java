package is442.TicketingSystem.services;

import is442.TicketingSystem.models.Event;
import is442.TicketingSystem.models.Customer;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import is442.TicketingSystem.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

	// Refer to https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html
	List<Ticket> findByEvent(Event event);
	List<Ticket> findByEventId(int eid);
	List<Ticket> findByBoughtBy(Customer c);
	Ticket findById(int id);
	List<Ticket> findByEventIdAndBoughtBy(int eid, Customer c);

	@Query(value = "SELECT * FROM \"ticket\" WHERE bought_by = :id", nativeQuery = true)
	List<Ticket> findByBoughtBy(@Param("id") Long user_id);

	@Transactional
	@Modifying
	@Query(value = "INSERT INTO \"ticket\" (event_id, bought_by, price, redeemed, refunded, purchase_time)" +
				"VALUES (:event_id, :bought_by, :price, :redeemed, :refunded, :purchase_time)" 
				, nativeQuery = true)
	void createTicket(@Param("event_id") Long event_id, @Param("bought_by") Long user_id, @Param("price") float price, @Param("redeemed") boolean redeemed, @Param("refunded") boolean refunded, @Param("purchase_time") LocalDateTime purchase_time);

	
}
