CREATE TYPE "usertype" AS ENUM (
  'customer',
  'event_manager',
  'ticket_officer'
);

CREATE TABLE "tags" (
  "id" serial PRIMARY KEY,
  "tag_name" varchar(255) NOT NULL, -- e.g. "Taylor Swift"
  "tag_type" varchar(255) NOT NULL -- e.g. "Music"
);

CREATE TABLE "user_table" (
  "id" serial PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL,
  "name" varchar(255) NOT NULL,
  "password_hash" varchar(32) NOT NULL,
  "user_type" usertype NOT NULL,
  "balance" float DEFAULT 1000
);

CREATE TABLE "ticketedevent" (
  "id" serial PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "venue" varchar(255) NOT NULL,
  "description" text,
  "price" float NOT NULL,
  "cancellation_fee" float NOT NULL DEFAULT 0.0,
  "num_tickets" int NOT NULL,
  "cancelled" bool NOT NULL,
  "start_time" timestamp NOT NULL,
  "end_time" timestamp NOT NULL,
  "image_link" varchar(255),
  "created_by" integer NOT NULL
);

CREATE TABLE "eventtags" (
  "event_id" integer NOT NULL,
  "tag_id" integer NOT NULL
);

CREATE TABLE "ticket" (
  "id" serial PRIMARY KEY,
  "event_id" integer NOT NULL,
  "price" float NOT NULL,
  "purchase_time" timestamp NOT NULL DEFAULT NOW(),
  "bought_by" integer NOT NULL,
  "redeemed" bool NOT NULL DEFAULT false,
  "refunded" bool NOT NULL DEFAULT false,
  "user_cancelled" bool NOT NULL DEFAULT false
);

CREATE TABLE "event_can_manage" (
  "user_id" integer NOT NULL,
  "event_id" integer NOT NULL
);

CREATE TABLE "ticket_officer_event_manager" (
  "ticket_officer_id" integer PRIMARY KEY NOT NULL,
  "event_manager_id" integer NOT NULL
);

-- Table to map event manager to event created
-- Table to give permissions to ticket officer to modify events

ALTER TABLE "ticket" ADD CONSTRAINT "ticket_event_fk" FOREIGN KEY ("event_id") REFERENCES "ticketedevent" ("id");

ALTER TABLE "ticket" ADD CONSTRAINT "ticket_user_fk" FOREIGN KEY ("bought_by") REFERENCES "user_table" ("id");

ALTER TABLE "ticketedevent" ADD CONSTRAINT "ticketedevent_eventmanager_fk" FOREIGN KEY ("created_by") REFERENCES "user_table" ("id");

ALTER TABLE "eventtags" ADD CONSTRAINT "event_eventtags_fk" FOREIGN KEY ("event_id") REFERENCES "ticketedevent" ("id");

ALTER TABLE "eventtags" ADD CONSTRAINT "tag_eventtags_fk" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id");

ALTER TABLE "event_can_manage" ADD CONSTRAINT "event_user_fk" FOREIGN KEY ("user_id") REFERENCES "user_table" ("id");

ALTER TABLE "event_can_manage" ADD CONSTRAINT "event_event_fk" FOREIGN KEY ("event_id") REFERENCES "ticketedevent" ("id");

ALTER TABLE "ticket_officer_event_manager" ADD CONSTRAINT "ticket_officer_user_fk" FOREIGN KEY ("ticket_officer_id") REFERENCES "user_table" ("id");

ALTER TABLE "ticket_officer_event_manager" ADD CONSTRAINT "event_manager_user_fk" FOREIGN KEY ("event_manager_id") REFERENCES "user_table" ("id");

-- Upon ticket being marked as cancelled, automatically mark all tickets as refunded
-- Upon ticket being marked as refunded, credit to user's balance

CREATE OR REPLACE FUNCTION refund_tickets_and_update_balance()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if cancelled
  IF OLD.cancelled IS FALSE AND NEW.cancelled IS TRUE THEN
    -- Update associated tickets
    UPDATE "ticket"
    SET "refunded" = TRUE
    WHERE "event_id" = NEW.id AND "redeemed" = FALSE AND "refunded" = FALSE;

    -- Update user's balance
    UPDATE "user_table"
    SET "balance" = "balance" + sub_price
    FROM (
      SELECT "bought_by", SUM("price") as price
      FROM "ticket"
      WHERE "event_id" = NEW.id AND "redeemed" = FALSE AND "refunded" = TRUE
      GROUP BY "bought_by"
    ) AS sub
    WHERE "user_table"."id" = sub."bought_by";
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CREATE TRIGGER on_refund_tickets
-- AFTER UPDATE OF cancelled ON "ticketedevent"
-- FOR EACH ROW
-- WHEN (OLD.cancelled IS FALSE AND NEW.cancelled IS TRUE)
-- EXECUTE FUNCTION refund_tickets_and_update_balance();

CREATE OR REPLACE FUNCTION refund_user_cancelled_ticket()
RETURNS TRIGGER AS $$
DECLARE
  refund_amount float;
  cancellation_fee float;
BEGIN
  -- Check if user marked as cancelled
  IF NEW.user_cancelled IS TRUE AND OLD.user_cancelled IS FALSE THEN
    -- Get cancellation fee
    SELECT "cancellation_fee" INTO cancellation_fee
    FROM "ticketedevent"
    WHERE "id" = NEW.event_id;

    -- Calculate refund amount
    refund_amount := NEW.price - cancellation_fee;

    -- Update balance
    UPDATE "user_table"
    SET "balance" = "balance" + refund_amount
    WHERE "id" = NEW.bought_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CREATE TRIGGER on_user_cancelled_ticket
-- AFTER UPDATE OF user_cancelled ON "ticket"
-- FOR EACH ROW
-- WHEN (OLD.user_cancelled IS FALSE AND NEW.user_cancelled IS TRUE)
-- EXECUTE FUNCTION refund_user_cancelled_ticket();