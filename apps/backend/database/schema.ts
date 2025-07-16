import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core"

const baseFields = {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}

export const usersTable = pgTable("users", {
  ...baseFields,
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 10, enum: ["admin", "user"] })
    .notNull()
    .default("user"),
})

export const siteLinksTable = pgTable("site_links", {
  ...baseFields,
  siteUrl: varchar("site_url", { length: 255 }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  coverImage: varchar("cover_image", { length: 255 }),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
})
