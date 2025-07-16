import { Request, Response } from "express"
import { addSiteSchema, AddSiteDto } from "../dtos/add-site.dto"
import { updateSiteSchema, UpdateSiteDto } from "../dtos/update-site.dto"
import sitesService from "../services/sites.service"
import { ValidationFailedError } from "../errors/validation-failed.error"

class SitesController {
  async addSite(req: Request, res: Response) {
    const result = addSiteSchema.safeParse(req.body)
    if (!result.success) {
      throw new ValidationFailedError(result.error.message, result.error)
    }
    const value: AddSiteDto = result.data
    const site = await sitesService.addSite(value)
    res.json(site)
  }

  async getAllSites(req: Request, res: Response) {
    const sites = await sitesService.getAllSites()
    res.json(sites)
  }

  async getSiteById(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      throw new ValidationFailedError("Invalid site id")
    }
    const site = await sitesService.getSiteById(id)
    res.json(site)
  }

  async updateSite(req: Request, res: Response) {
    const result = updateSiteSchema.safeParse({
      id: Number(req.params.id),
      ...req.body,
    })
    if (!result.success) {
      throw new ValidationFailedError(result.error.message, result.error)
    }
    const value: UpdateSiteDto = result.data
    const site = await sitesService.updateSite(value)
    res.json(site)
  }

  async deleteSite(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      throw new ValidationFailedError("Invalid site id")
    }
    const site = await sitesService.deleteSite({ id })
    res.json(site)
  }
}

const sitesController = new SitesController()

export default sitesController
