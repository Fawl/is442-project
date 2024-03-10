package is442.TicketingSystem.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import is442.TicketingSystem.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	String deleteByEmail(String email);

	User findFirstByEmail(String email);

	User findById(int id);
}
