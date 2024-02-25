package is442.TicketingSystem.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	private LocalDateTime startTime;
	@Column(name = "end_time")
	private LocalDateTime endTime;
	private boolean cancelled;
	@Column(name = "image_link")
	private String imageLink;

	private double price;

	@Column(name = "cancellation_fee")
	private double cancellationFee;

	@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
	@JsonIdentityReference(alwaysAsId=true)
	@OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
	private List<Ticket> tickets;

	@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
	@JsonIdentityReference(alwaysAsId=true)
	@JoinColumn(name = "created_by")
    @ManyToOne(fetch = FetchType.LAZY)
	private User createdBy;

	// Constructors, getters, and setters
	public Long getId() {
		return id;
	}
	public LocalDateTime getEnd() {
		return endTime;
	}
	public LocalDateTime getStart() {
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
	public double getPrice() {
		return price;
	}
	public boolean getCancelled() {
		return cancelled;
	}
	public List<Ticket> getTickets() {
		return this.tickets;
	}
	public String getImageLink() {
		return imageLink;
	}
	public User getCreatedBy() {
		return createdBy;
	}

	public String toString() {
		return String.format("ID: %d, Title: %s, image: %s", id, title, imageLink);
	}
	
	public void cancel() {
		this.cancelled = true;
	}

	public void open() {
		this.cancelled = false;
	}

	public void setEnd(LocalDateTime end) {
		this.endTime = end;
	}

	public void setStart(LocalDateTime start) {
		this.startTime = start;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}
}