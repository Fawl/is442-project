package is442.TicketingSystem.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class User {
    @Id
    private String email;

    @Column(name = "password_hash")
    private String password_hash;


    public User(String email, String password_hash){
        this.email = email;
        this.password_hash = password_hash;
    }

    public String getEmail(){
        return this.email;
    }

    public String getPasswordHash(){
        return this.password_hash;
    }

    public void setPasswordHash(String newPw){
        this.password_hash = newPw;
    }
}
