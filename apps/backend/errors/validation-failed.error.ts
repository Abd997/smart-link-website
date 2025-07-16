import z from "zod"
import { BaseError } from "./base.error"

export class ValidationFailedError extends BaseError {
  err = {}
  constructor(message: string, err?: any) {
    super(message, 400)
    this.err = z.treeifyError(err)
  }
}
