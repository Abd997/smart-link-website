import { z } from "zod"

export const generateDescriptionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
})

export type GenerateDescriptionDto = z.infer<typeof generateDescriptionSchema>
