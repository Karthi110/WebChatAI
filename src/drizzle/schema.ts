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
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  name: text("name"),
  email: text("email").notNull().unique(),
  tier: tierEnum("tier"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const indexedUrls = pgTable("indexedUrls", {
  id: serial("id").primaryKey().notNull().unique(),
  url: text("url").notNull().unique(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey().notNull().unique(),
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
  id: serial("id").primaryKey().notNull().unique(),
  body: text("body"),
  role: roleEnum("role"),
  messagesId: integer("messages_id").references(() => messages.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

type newUser = typeof user.$inferInsert;
type newUrl = typeof indexedUrls.$inferInsert;
type newMessages = typeof messages.$inferInsert;
type newMessage = typeof message.$inferInsert;
