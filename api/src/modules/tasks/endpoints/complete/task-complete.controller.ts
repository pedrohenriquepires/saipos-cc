import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { TaskCompleteService } from './task-complete.service'

export class TaskCompleteController {
  constructor(private taskCompleteService: TaskCompleteService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params

    try {
      await this.taskCompleteService.execute(id)

      return res.status(200).send()
    } catch (error) {
      return next(createHttpError(400, error))
    }
  }
}
