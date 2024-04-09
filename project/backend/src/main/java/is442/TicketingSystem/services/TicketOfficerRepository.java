package is442.TicketingSystem.services;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import is442.TicketingSystem.models.TicketOfficer;

@Repository
public interface TicketOfficerRepository extends UserRepository <TicketOfficer>{
    @Query(value = "SELECT u.* " + 
    "FROM user_table u " + 
    "INNER JOIN ticket_officer_event_manager toem ON u.id = toem.ticket_officer_id " + 
    "WHERE toem.event_manager_id = :emid", nativeQuery = true)
	List<TicketOfficer> findTicketOfficersByEventManager(@Param("emid") Long emid);
}
