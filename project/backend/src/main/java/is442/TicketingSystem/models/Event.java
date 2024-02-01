package is442.TicketingSystem.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Event")
public class Event {

	@Id
	private Long id;
	private String title;
	private String venue;
	private int num_tickets;
	private LocalDate start_time;
	private LocalDate end_time;
	private boolean cancelled;
	// private double price;

	// Constructors, getters, and setters
	public Long getId() {
		return id;
	}
	public LocalDate getEnd() {
		return end_time;
	}
	public LocalDate getStart() {
		return start_time;
	}
	public int getNumTickets() {
		return num_tickets;
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

	public void setEnd_time(LocalDate end_time) {
		this.end_time = end_time;
	}

	public void setStart_time(LocalDate start_time) {
		this.start_time = start_time;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}
}
