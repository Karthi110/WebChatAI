import {
  serial,
  text,
  timestamp,
  pgTable,
  pgEnum,
  integer,
  uuid,
  char,
} from "drizzle-orm/pg-core";

export const tierEnum = pgEnum("tier", ["free", "standard", "plus"]);

export const user = pgTable("user", {
  id: text("id").primaryKey().notNull().unique(),
  name: text("name"),
  email: text("email").notNull().unique(),
  imageUrl: text("image_url"),
  tier: tierEnum("tier").default("free"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const indexedUrls = pgTable("indexedUrls", {
  id: uuid("id").defaultRandom().primaryKey().notNull().unique(),
  url: text("url").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const chat = pgTable("chat", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  chatName: text("chat_name"),
  chatImage: text("chat_image"),
  urlId: uuid("url_id")
    .references(() => indexedUrls.id)
    .notNull(),
  userId: text("user_id")
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
  chatId: uuid("chat_id").references(() => chat.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type newUser = typeof user.$inferInsert;
export type newUrl = typeof indexedUrls.$inferInsert;
export type newChat = typeof chat.$inferInsert;
export type newMessage = typeof message.$inferInsert;
