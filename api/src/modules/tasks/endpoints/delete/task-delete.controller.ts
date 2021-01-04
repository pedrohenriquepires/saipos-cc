import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { TaskDeleteService } from './task-delete.service'

export class TaskDeleteController {
  constructor(private taskDeleteService: TaskDeleteService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params

    try {
      await this.taskDeleteService.execute(id)

      return res.status(200).send()
    } catch (error) {
      return next(createHttpError(400, error))
    }
  }
}
