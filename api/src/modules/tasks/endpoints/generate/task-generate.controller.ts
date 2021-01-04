import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { TaskGenerateService } from './task-generate.service'

export class TaskGenerateController {
  constructor(private taskGenerateService: TaskGenerateService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    try {
      await this.taskGenerateService.execute()

      return res.status(200).send()
    } catch (error) {
      return next(createHttpError(400, error))
    }
  }
}
