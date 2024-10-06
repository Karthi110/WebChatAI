import { Many, relations } from "drizzle-orm";
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

export const usersRelations = relations(user, ({ many }) => ({
  chat: many(chat),
}));

export const indexedUrls = pgTable("indexedUrls", {
  id: serial("id").primaryKey().notNull(),
  url: text("url").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const chat = pgTable("chat", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  chatName: text("chat_name"),
  chatImage: text("chat_image"),
  url: text("url").references(() => indexedUrls.url),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const roleEnum = pgEnum("role", ["user", "assistant"]);

export const chatRelations = relations(chat, ({ many, one }) => ({
  message: many(message),
  user: one(user, { fields: [chat.userId], references: [user.id] }),
}));

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

export const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, { fields: [message.chatId], references: [chat.id] }),
}));

export type newUser = typeof user.$inferInsert;
export type newUrl = typeof indexedUrls.$inferInsert;
export type newChat = typeof chat.$inferInsert;
export type newMessage = typeof message.$inferInsert;
