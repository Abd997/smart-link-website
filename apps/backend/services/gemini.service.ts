import { GenerateDescriptionDto } from "../dtos/generate-description.dto"
import { env } from "../utils/env"
import { GoogleGenAI } from "@google/genai"

const genAI = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })

class GeminiService {
  async generateDescription(dto: GenerateDescriptionDto): Promise<string> {
    try {
      const prompt = `Generate a 2,3 sentence description for a website titled "${dto.title}" in the "${dto.category}" category. Keep it clear and concise.`
      const response = await genAI.models.generateContent({
        model: "models/gemini-1.5-flash",
        contents: prompt,
      })
      return response.text ? response.text.trim() : ""
    } catch (err: any) {
      throw new Error("Invalid Gemini key provided.")
    }
  }
}

const geminiService = new GeminiService()

export default geminiService
