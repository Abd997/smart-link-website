import { z } from "zod"

export const updateSiteSchema = z.object({
  id: z.number(),
  siteUrl: z.url().optional(),
  title: z.string().min(1).max(100).optional(),
  coverImage: z.string().optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).max(50).optional(),
})

export type UpdateSiteDto = z.infer<typeof updateSiteSchema>
