import { QuerySchema } from "../types/schema";

export const userSchema: QuerySchema = [
  { name: "name", type: "string" },
  { name: "age", type: "number" },
  { name: "country", type: "string" },
  {
    name: "status",
    type: "enum",
    enumValues: ["active", "inactive", "pending"],
  },
  { name: "createdAt", type: "date" },
];

export const orderSchema: QuerySchema = [
  { name: "customer", type: "string" },
  { name: "amount", type: "number" },
  { name: "country", type: "string" },
  {
    name: "status",
    type: "enum",
    enumValues: ["paid", "pending", "failed", "refunded"],
  },
  { name: "createdAt", type: "date" },
];

export const eventSchema: QuerySchema = [
  { name: "title", type: "string" },
  {
    name: "category",
    type: "enum",
    enumValues: ["auth", "billing", "system", "user", "admin", "integration"],
  },
  {
    name: "severity",
    type: "enum",
    enumValues: ["low", "medium", "high"],
  },
  { name: "user", type: "string" },
  { name: "createdAt", type: "date" },
];

export function getSchema(dataset: "users" | "orders" | "events") {
  if (dataset === "orders") return orderSchema;
  if (dataset === "events") return eventSchema;

  return userSchema;
}
