package is442.TicketingSystem.services;

import org.springframework.stereotype.Repository;
import is442.TicketingSystem.models.Customer;

@Repository
public interface CustomerRepository extends UserRepository{


	Customer findFirstByEmail(String email);

	Customer findById(int id);
}
