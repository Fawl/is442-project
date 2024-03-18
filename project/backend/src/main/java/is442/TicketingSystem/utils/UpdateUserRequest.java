package is442.TicketingSystem.utils;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String emailBefore;
    private String emailAfter;
    private String password_hash;
    private UserType user_type;
}
