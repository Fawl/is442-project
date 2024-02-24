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
  "password_hash" char(32) NOT NULL,
  "user_type" usertype NOT NULL,
  "balance" float NOT NULL DEFAULT 1000
);

CREATE TABLE "ticketedevent" (
  "id" serial PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "venue" varchar(255) NOT NULL,
  "desc" text,
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
  "refunded" bool NOT NULL DEFAULT false
);

CREATE TABLE "event_can_manage" (
  "user_id" integer NOT NULL,
  "event_id" integer NOT NULL
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