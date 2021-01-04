import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { TaskCreateService } from './task-create.service'

export class TaskCreateController {
  constructor(private taskCreateService: TaskCreateService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    const { description, ownerName, ownerEmail } = req.body

    try {
      const createdTask = await this.taskCreateService.execute({
        description,
        ownerName,
        ownerEmail,
      })

      return res.status(201).send(createdTask)
    } catch (error) {
      return next(createHttpError(400, error))
    }
  }
}
