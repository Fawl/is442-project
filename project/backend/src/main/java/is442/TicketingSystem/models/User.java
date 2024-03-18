package is442.TicketingSystem.models;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import is442.TicketingSystem.utils.UserType;
import lombok.Data;



@Data
@Entity
@Table(name = "user_table")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
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
    @Column(insertable=false, updatable=false)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private UserType user_type;
}
