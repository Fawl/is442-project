package is442.TicketingSystem.models;

import jakarta.persistence.*;

import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;



@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@DiscriminatorValue("event_manager")
public class EventManager extends User {
    
    @OneToMany(mappedBy = "createdBy", fetch = FetchType.LAZY)
    private List<Event> events;
}
