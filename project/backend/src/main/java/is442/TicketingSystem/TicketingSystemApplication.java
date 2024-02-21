package is442.TicketingSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TicketingSystemApplication {
	// RUN mvn clean compile assembly:single 
	// to make a single jar file
	public static void main(String[] args) {
		SpringApplication.run(TicketingSystemApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*");
			}
		};
	}

}
