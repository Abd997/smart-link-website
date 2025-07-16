import Router from "express-promise-router"
import sitesController from "../controllers/sites.controller"
import aiController from "../controllers/ai.controller"

const privateRoutes = Router()

privateRoutes.post("/sites", (req, res) => sitesController.addSite(req, res))
privateRoutes.put("/sites/:id", (req, res) => sitesController.updateSite(req, res))
privateRoutes.delete("/sites/:id", (req, res) => sitesController.deleteSite(req, res))

privateRoutes.post("/ai/generate-description", (req, res) =>
  aiController.generateDescription(req, res)
)

export default privateRoutes
