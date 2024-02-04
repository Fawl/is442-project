CREATE TYPE "UserType" AS ENUM (
  'customer',
  'event_manager',
  'ticket_officer'
);

CREATE TABLE "User" (
  "email" varchar(255) PRIMARY KEY NOT NULL,
  "password_hash" char(32) NOT NULL,
  "user_type" "UserType" NOT NULL,
  "balance" float NOT NULL DEFAULT 1000
);

CREATE TABLE "Events" (
  "id" integer PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "venue" varchar(255) NOT NULL,
  "num_tickets" int NOT NULL,
  "cancelled" bool NOT NULL,
  "start_time" date NOT NULL,
  "end_time" date NOT NULL
);

CREATE TABLE "Ticket" (
  "event_id" integer NOT NULL,
  "id" integer NOT NULL,
  "price" float NOT NULL,
  "redeemed" bool NOT NULL DEFAULT false,
  PRIMARY KEY ("event_id", "id")
);

CREATE TABLE "TicketPurchase" (
  "ticket_id" integer NOT NULL,
  "event_id" integer NOT NULL,
  "user_email" varchar(255) NOT NULL,
  PRIMARY KEY ("ticket_id", "event_id", "user_email")
);

ALTER TABLE "Ticket" ADD CONSTRAINT "ticket_event_fk" FOREIGN KEY ("event_id") REFERENCES "Events" ("id");

ALTER TABLE "Ticket" ADD CONSTRAINT "ticket_ticketpurchase_fk" FOREIGN KEY ("event_id", "id") REFERENCES "TicketPurchase" ("event_id", "ticket_id");

ALTER TABLE "TicketPurchase" ADD CONSTRAINT "user_ticketpurchase_fk" FOREIGN KEY ("user_email") REFERENCES "User" ("email");
