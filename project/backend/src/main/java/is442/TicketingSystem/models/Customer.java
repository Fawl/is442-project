package is442.TicketingSystem.models;

import jakarta.persistence.*;

import java.util.List;

import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import is442.TicketingSystem.utils.UserType;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper=false)

@Entity
@DiscriminatorValue("customer")


public class Customer extends User{
    @Column
    private float balance = 1000;

    @OneToMany(mappedBy = "boughtBy", fetch = FetchType.LAZY)
    private List<Ticket> tickets;
}
