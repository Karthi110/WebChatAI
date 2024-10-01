import {
  serial,
  text,
  timestamp,
  pgTable,
  pgEnum,
  integer,
  uuid,
} from "drizzle-orm/pg-core";

export const tierEnum = pgEnum("tier", ["free", "standard", "plus"]);

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull(),
  tier: tierEnum("tier"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const indexedUrls = pgTable("indexedUrls", {
  id: serial("id").primaryKey(),
  url: text("url"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  urlId: integer("url_id").references(() => indexedUrls.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const roleEnum = pgEnum("role", ["user", "system"]);

export const message = pgTable("message", {
  id: serial("id").primaryKey(),
  body: text("body"),
  role: roleEnum("role"),
  messagesId: integer("messages_id").references(() => messages.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
