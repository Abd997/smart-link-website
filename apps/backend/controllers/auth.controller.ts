import { Request, Response } from "express"
import authService from "../services/auth.service"
import { userSignupSchema, UserSignupDto } from "../dtos/user-signup.dto"
import { userLoginSchema, UserLoginDto } from "../dtos/user-login.dto"
import { ValidationFailedError } from "../errors/validation-failed.error"

class AuthController {
  async signup(req: Request, res: Response) {
    const result = userSignupSchema.safeParse(req.body)
    if (!result.success) {
      throw new ValidationFailedError(result.error.message, result.error)
    }
    const value: UserSignupDto = result.data
    const user = await authService.signup(value)
    res.json(user)
  }

  async login(req: Request, res: Response) {
    const result = userLoginSchema.safeParse(req.body)
    if (!result.success) {
      throw new ValidationFailedError(result.error.message, result.error)
    }
    const value: UserLoginDto = result.data
    const token = await authService.login(value)
    res.json(token)
  }
}

const authController = new AuthController()

export default authController
