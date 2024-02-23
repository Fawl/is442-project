package is442.TicketingSystem.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GenerationType;
import jakarta.persistence.EnumType;
import jakarta.persistence.GeneratedValue;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import lombok.Data;
import is442.TicketingSystem.types.usertype;


@Data
@Entity
@Table(name = "user_table")
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String email;

    @Column
    private String password_hash;

    @Enumerated(EnumType.STRING) // Use EnumType.STRING to store enum names as strings
    @Column
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private usertype user_type;

    @Column
    private float balance = 1000;
}
