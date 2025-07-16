import { Request, Response, NextFunction } from "express"
import { ValidationFailedError } from "../errors/validation-failed.error"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  if (err instanceof ValidationFailedError) {
    return res.status(400).json(err)
  }
  const status = err.statusCode || err.status || 500
  const message = err.message || "Internal Server Error"
  res.status(status).json({ error: message })
}

export default errorHandler
