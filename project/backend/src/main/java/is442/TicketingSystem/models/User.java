package is442.TicketingSystem.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import lombok.Data;


@Data
@Entity
@Table(name = "user_table")
public class User {
    @Id
    private String email;

    @Column
    private String password_hash;

    // @Enumerated(EnumType.STRING) // Use EnumType.STRING to store enum names as strings
    @Column
    private String user_type;

    @Column
    private float balance;
}
