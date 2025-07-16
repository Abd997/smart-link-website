import { Request, Response, NextFunction } from "express"

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" })
}

export default notFoundHandler
