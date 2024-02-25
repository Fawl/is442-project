package is442.TicketingSystem.utils;

import lombok.Data;

@Data
public class NewTicket {
    private long event_id;
    private long user_id;
    private boolean redeemed;
    private boolean refunded;
    private float price;
}
