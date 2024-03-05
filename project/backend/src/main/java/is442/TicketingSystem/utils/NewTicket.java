package is442.TicketingSystem.utils;

import lombok.Data;

@Data
public class NewTicket {
    private long event_id;
    private long user_id;
    private boolean redeemed;
    private boolean refunded;
    private float price;

    public long getEvent_id() {
        return this.event_id;
    }

    public long getUser_id() {
        return this.user_id;
    }

    public boolean isRedeemed() {
        return this.redeemed;
    }

    public boolean isRefunded() {
        return this.refunded;
    }

    public float getPrice() {
        return this.price;
    }
}
