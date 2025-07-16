import { z } from "zod"

export const userSignupSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().min(6).max(255),
  role: z.enum(["admin", "user"]).default("user"),
})

export type UserSignupDto = z.infer<typeof userSignupSchema>
