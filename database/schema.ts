// database/schema.ts
import {
  pgTable,
  serial,
  varchar,
  integer,
  numeric,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(), // e.g., "Tripoli Downtown"
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
});

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  brand: varchar("brand", { length: 100 }).notNull(), // e.g. "Toyota"
  model: varchar("model", { length: 100 }).notNull(), // e.g. "Corolla"
  year: integer("year").notNull(), // e.g. 2022
  pricePerDay: numeric("price_per_day", { precision: 10, scale: 2 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  locationId: integer("location_id")
    .notNull()
    .references(() => locations.id, { onDelete: "cascade" }),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  carId: integer("car_id")
    .notNull()
    .references(() => cars.id, { onDelete: "cascade" }),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  status: bookingStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const locationsRelations = relations(locations, ({ many }) => ({
  cars: many(cars),
}));

export const carsRelations = relations(cars, ({ many, one }) => ({
  location: one(locations, {
    fields: [cars.locationId],
    references: [locations.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  car: one(cars, {
    fields: [bookings.carId],
    references: [cars.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;

export type Location = typeof locations.$inferSelect;
export type NewLocation = typeof locations.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
