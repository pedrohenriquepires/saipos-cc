import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { TaskRefuseService } from './task-refuse.service'

export class TaskRefuseController {
  constructor(private taskRefuseService: TaskRefuseService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    const { id } = req.params
    const { password } = req.body

    try {
      await this.taskRefuseService.execute(id, password)

      return res.status(200).send()
    } catch (error) {
      return next(createHttpError(400, error))
    }
  }
}
