package is442.TicketingSystem.services;

import java.util.List;
import is442.TicketingSystem.utils.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import is442.TicketingSystem.models.*;

@Repository
public interface UserRepository< T extends User > extends JpaRepository<T, Long> {


	// LOVELY JAVA STRIKES AGAIN https://stackoverflow.com/questions/63656497/jpa-repository-with-single-table-inheritance-hibernate
	@Query("from Customer")
	List<Customer> findAllCustomers();

	@Query("from EventManager")
	List<EventManager> findAllEventManagers();

	@Query("from TicketOfficer")
	List<TicketOfficer> findAllTicketOfficer();

	String deleteByEmail(String email);

	T findFirstByEmail(String email);

	T findById(int id);

	// THANKS JAVA FOR BEING FUCKING ANNOYING
	// https://stackoverflow.com/questions/44460394/can-i-use-enum-parameter-into-jparepository-nativequery
	@Transactional
	@Modifying
	@Query(value = "INSERT INTO \"user_table\" (email, name, password_hash, user_type)" +
				"VALUES (:email, :name, :password_hash, CAST(:#{#user_type?.name()} as usertype) )" 
				, nativeQuery = true)
	void createUser(@Param("email") String email, @Param("name") String name, @Param("password_hash") String password_hash, @Param("user_type") UserType userType);
}
