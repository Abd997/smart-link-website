import { z } from "zod"

export const addSiteSchema = z.object({
  siteUrl: z.url(),
  title: z.string().min(1).max(100),
  coverImage: z.string().optional(),
  description: z.string().min(1),
  category: z.string().min(1).max(50),
})

export type AddSiteDto = z.infer<typeof addSiteSchema>
