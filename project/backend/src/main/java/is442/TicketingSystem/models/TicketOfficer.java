package is442.TicketingSystem.models;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import is442.TicketingSystem.utils.UserType;
import lombok.Data;
import lombok.EqualsAndHashCode;



@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@DiscriminatorValue("ticket_officer")
public class TicketOfficer extends User {
    

    // TBC: List of events that this TO is authorised to manage
}
