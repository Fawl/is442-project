package is442.TicketingSystem.models;


import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JoinColumn(name = "event_id")
    @ManyToOne
    // The decoraters are because of: https://stackoverflow.com/questions/20813496/tomcat-exception-cannot-call-senderror-after-the-response-has-been-committed
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    private Event event;

    @JoinColumn(name = "bought_by")
    @ManyToOne
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
	private User boughtBy;

    @Column(name = "redeemed", columnDefinition = "boolean default false")
    private boolean redeemed;

    @Column(name = "refunded", columnDefinition = "boolean default false")
    private boolean refunded;

    @Column(name = "purchase_time")
    private LocalDateTime purchaseTime;

    private float price;

    public Event getEvent() {
        return event;
    }

    public long getId() {
        return id;
    }

    public boolean getRedeemed() {
        return redeemed;
    }

    public boolean getRefunded() {
        return refunded;
    }

    public float getPrice() {
        return price;
    }

    public User getBoughtBy() {
        return boughtBy;
    }

    public void setRedeemed() {
        this.redeemed = true;
    }

    public LocalDateTime getPurchaseTime() {
        return this.purchaseTime;
    }

    public String toString() {
        return "ID: " + this.getId() + ", Event ID: " + this.getEvent() + ", Price: " + this.getPrice() + ", purchase time: " + this.getPurchaseTime() + ", bought by: " + this.getBoughtBy() + ", redeemed: " + this.getRedeemed() + ", refunded: " + this.getRefunded();
    }
}