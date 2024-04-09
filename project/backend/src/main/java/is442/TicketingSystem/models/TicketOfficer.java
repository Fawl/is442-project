package is442.TicketingSystem.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@DiscriminatorValue("ticket_officer")
@SecondaryTable(name="ticket_officer_event_manager", pkJoinColumns=@PrimaryKeyJoinColumn(name="ticket_officer_id"))
public class TicketOfficer extends User {

    @Column(table = "ticket_officer_event_manager", name = "event_manager_id")
    private Long managedBy;

}
