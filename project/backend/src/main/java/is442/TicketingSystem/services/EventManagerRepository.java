package is442.TicketingSystem.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import is442.TicketingSystem.models.Customer;
import is442.TicketingSystem.models.EventManager;

@Repository
public interface EventManagerRepository extends UserRepository{


	EventManager findFirstByEmail(String email);

	EventManager findById(int id);
}
