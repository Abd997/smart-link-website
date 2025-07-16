import { AddSiteDto } from "../dtos/add-site.dto"
import { UpdateSiteDto } from "../dtos/update-site.dto"
import { eq } from "drizzle-orm"
import { NotFoundError } from "../errors/not-found.error"
import { db, siteLinksTable } from "../database"

class SitesService {
  async addSite(data: AddSiteDto) {
    const site = await db.insert(siteLinksTable).values(data)
    return site
  }

  async getAllSites() {
    return await db.select().from(siteLinksTable)
  }

  async getSiteById(id: number) {
    const sites = await db.select().from(siteLinksTable).where(eq(siteLinksTable.id, id))
    if (sites.length === 0) {
      throw new NotFoundError(`Site with id ${id} not found`)
    }
    return sites[0]
  }

  async updateSite(data: UpdateSiteDto) {
    const { id, ...updateFields } = data
    const site = await db
      .update(siteLinksTable)
      .set(updateFields)
      .where(eq(siteLinksTable.id, id))
    return site
  }

  async deleteSite(data: { id: number }) {
    const site = await db.delete(siteLinksTable).where(eq(siteLinksTable.id, data.id))
    return site
  }
}

const sitesService = new SitesService()

export default sitesService
