import { z } from "zod"

const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  PORT: z.number().default(8080),
  DATABASE_URL: z.string(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", z.treeifyError(parsed.error))
  process.exit(1)
}

export const env = parsed.data
