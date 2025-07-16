"use client"

import { z } from "zod"
import logger from "./logger"

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url(),
  NODE_ENV: z.string(),
})

const envVars = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
}

const parsed = envSchema.safeParse(envVars)

if (!parsed.success) {
  logger.error(
    "❌ Invalid or missing environment variables:",
    z.treeifyError(parsed.error)
  )
  throw new Error("Missing or invalid environment variables. Check your .env file.")
}

export const env = parsed.data
