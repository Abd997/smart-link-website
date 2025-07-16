import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { UnauthorizedError } from "../errors/unauthorized.error"
import { JwtPayload } from "../types/jwt-payload"
import { env } from "../utils/env"

export default function adminCheckMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("No token provided")
  }
  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    if (decoded.role !== "admin") {
      throw new UnauthorizedError("Admin access required")
    }
    next()
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token")
  }
}
