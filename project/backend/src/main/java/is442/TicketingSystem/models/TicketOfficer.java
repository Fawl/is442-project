package is442.TicketingSystem.models;

import org.hibernate.annotations.Formula;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;



@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@DiscriminatorValue("ticket_officer")
public class TicketOfficer extends User {
    // TBC: List of events that this TO is authorised to manage
}
