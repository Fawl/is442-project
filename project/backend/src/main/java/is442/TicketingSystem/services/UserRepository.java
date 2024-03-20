package is442.TicketingSystem.services;

import is442.TicketingSystem.utils.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import is442.TicketingSystem.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	String deleteByEmail(String email);

	User findFirstByEmail(String email);

	User findById(int id);

	// THANKS JAVA FOR BEING FUCKING ANNOYING
	// https://stackoverflow.com/questions/44460394/can-i-use-enum-parameter-into-jparepository-nativequery
	@Transactional
	@Modifying
	@Query(value = "INSERT INTO \"user_table\" (email, password_hash, user_type)" +
				"VALUES (:email, :password_hash, CAST(:#{#user_type?.name()} as usertype) )" 
				, nativeQuery = true)
	void createUser(@Param("email") String email, @Param("password_hash") String password_hash, @Param("user_type") UserType userType);
}
