package is442.TicketingSystem.models;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JoinColumn(name = "event_id")
    @ManyToOne
    private Event event;

    @JoinColumn(name = "bought_by")
    @ManyToOne
	private User boughtBy;

    @Column(name = "redeemed", columnDefinition = "boolean default false")
    private boolean redeemed;

    @Column(name = "refunded", columnDefinition = "boolean default false")
    private boolean refunded;

    @Column(name = "purchase_time")
    private LocalDateTime purchaseTime;

    public Event getEvent() {
        return event;
    }

    public long getId() {
        return id;
    }

    public boolean getRedeemed() {
        return redeemed;
    }

    public void setRedeemed() {
        this.redeemed = true;
    }

}
