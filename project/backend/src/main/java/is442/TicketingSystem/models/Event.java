package is442.TicketingSystem.models;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
SO WHAT DID I DISCOVER? JPA/PSQL IS VERY PARTICULAR WITH THE TABLE NAME.
AND IT AUTO LOWER CASES YOUR FUCKING TABLE NAME, UNLESS YOU ADD IN spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
IN THE application.properties
 */
@Entity
@Table(name = "ticketedevent")
public class Event {
	
	@Id
	private Long id;
	private String title;
	private String venue;
	/*
	ALSO, JPA/PSQL DOES NOT LIKE UNDERSCORES VERY MUCH.
	https://stackoverflow.com/questions/23456197/spring-data-jpa-repository-underscore-on-entity-column-name
	PLUS, WHEN RETURNING THE RESULTS, IT OMITS THE SHIT AFTER THE _ 
	SO, TO EASE THE PAIN OF EVERYONE, IF THERES UNDERSCORES IN THE COLUMN DB, FOLLOW THESE STEPS:
	1. NAME VARIABLE WITH CAMELCASE
	2. ADD @COLUMN DECORATOR WITH THE PROPER COLUMN NAME

	CREDS TO https://copyprogramming.com/howto/spring-data-jpa-repository-underscore-on-entity-column-name
	but dont follow soln 3 or 4
	*/
	@Column(name = "num_tickets")
	private int numTickets;
	@Column(name = "start_time")
	private LocalDate startTime;
	@Column(name = "end_time")
	private LocalDate endTime;
	private boolean cancelled;
	// private double price;

	// Constructors, getters, and setters
	public Long getId() {
		return id;
	}
	public LocalDate getEnd() {
		return endTime;
	}
	public LocalDate getStart() {
		return startTime;
	}
	public int getNumTickets() {
		return numTickets;
	}
	public String getVenue() {
		return venue;
	}
	public String getTitle() {
		return title;
	}
	// public double getPrice() {
	//     return price;
	// }
	public boolean getCancelled() {
		return cancelled;
	}
	
	public void cancel() {
		this.cancelled = true;
	}

	public void open() {
		this.cancelled = false;
	}

	public void setEnd(LocalDate end) {
		this.endTime = end;
	}

	public void setStart(LocalDate start) {
		this.startTime = start;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}
}
