import { Request, Response } from "express"
import sitesController from "../controllers/sites.controller"
import authController from "../controllers/auth.controller"
import Router from "express-promise-router"

const publicRouter = Router()

publicRouter.get("/sites", (req: Request, res: Response) =>
  sitesController.getAllSites(req, res)
)

publicRouter.get("/sites/:id", (req: Request, res: Response) =>
  sitesController.getSiteById(req, res)
)

publicRouter.post("/auth/signup", (req: Request, res: Response) =>
  authController.signup(req, res)
)

publicRouter.post("/auth/login", (req: Request, res: Response) =>
  authController.login(req, res)
)

export default publicRouter
