package is442.TicketingSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TicketingSystemApplication {
	// RUN mvn clean compile assembly:single 
	// to make a single jar file
	public static void main(String[] args) {
		SpringApplication.run(TicketingSystemApplication.class, args);
	}

}
