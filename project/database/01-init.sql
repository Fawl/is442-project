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

CREATE TABLE "user" (
  "email" varchar(255) PRIMARY KEY,
  "password_hash" char(32) NOT NULL,
  "user_type" usertype NOT NULL,
  "balance" float NOT NULL DEFAULT 1000
);

CREATE TABLE "ticketedevent" (
  "id" serial PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "venue" varchar(255) NOT NULL,
  "num_tickets" int NOT NULL,
  "cancelled" bool NOT NULL,
  "start_time" timestamp NOT NULL,
  "end_time" timestamp NOT NULL,
  "image_link" varchar(255)
);

CREATE TABLE "eventtags" (
  "event_id" integer NOT NULL,
  "tag_id" integer NOT NULL
);

CREATE TABLE "ticket" (
  "event_id" integer PRIMARY KEY NOT NULL,
  "id" serial NOT NULL,
  "price" float NOT NULL,
  "purchase_time" timestamp NOT NULL,
  "redeemed" bool NOT NULL DEFAULT false
);

CREATE TABLE "purchase" (
  "ticket_id" integer PRIMARY KEY NOT NULL,
  "event_id" integer NOT NULL,
  "user_email" varchar(255) NOT NULL
);

ALTER TABLE "ticket" ADD CONSTRAINT "ticket_event_fk" FOREIGN KEY ("event_id") REFERENCES "ticketedevent" ("id");

ALTER TABLE "ticket" ADD CONSTRAINT "ticket_ticketpurchase_fk" FOREIGN KEY ("id") REFERENCES "purchase" ("ticket_id");

ALTER TABLE "purchase" ADD CONSTRAINT "user_ticketpurchase_fk" FOREIGN KEY ("user_email") REFERENCES "user" ("email");

ALTER TABLE "eventtags" ADD CONSTRAINT "event_eventtags_fk" FOREIGN KEY ("event_id") REFERENCES "ticketedevent" ("id");

ALTER TABLE "eventtags" ADD CONSTRAINT "tag_eventtags_fk" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id");
