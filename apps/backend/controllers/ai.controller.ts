import { Request, Response } from "express"
import geminiService from "../services/gemini.service"
import { BadRequestError } from "../errors/bad-request.error"
import { generateDescriptionSchema } from "../dtos/generate-description.dto"

class AIController {
  async generateDescription(req: Request, res: Response) {
    const result = generateDescriptionSchema.safeParse(req.body)
    if (!result.success) {
      throw new BadRequestError(result.error.issues[0].message)
    }
    const description = await geminiService.generateDescription(result.data)
    res.json({ description })
  }
}

const aiController = new AIController()

export default aiController
