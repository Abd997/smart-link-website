import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "../utils/env"

const client = postgres(env.DATABASE_URL)

export const db = drizzle(client)

export async function verifyDbConnection(): Promise<void> {
  try {
    // Try a simple query to check connection
    await client`SELECT 1`
    console.log("Database connection verified")
  } catch (err) {
    console.error("Database connection failed:", err)
    throw new Error(
      "Database connection failed: " + (err instanceof Error ? err.message : String(err))
    )
  }
}
