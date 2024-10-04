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
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  url: text("url").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
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
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  body: text("body"),
  role: roleEnum("role"),
  messagesId: integer("messages_id").references(() => messages.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type newUser = typeof user.$inferInsert;
export type newUrl = typeof indexedUrls.$inferInsert;
export type newMessages = typeof messages.$inferInsert;
export type newMessage = typeof message.$inferInsert;
