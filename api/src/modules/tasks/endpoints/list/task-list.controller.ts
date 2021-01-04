import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { TaskStatusEnum } from '../../task.model'
import { TaskListService } from './task-list.service'

export class TaskListController {
  constructor(private taskListService: TaskListService) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const tasks = await this.taskListService.execute()

      const pending = tasks.filter(task => task.status === TaskStatusEnum.PENDING)
      const done = tasks.filter(task => task.status === TaskStatusEnum.DONE)

      return res.status(200).send({ pending, done })
    } catch (error) {
      return next(createHttpError(400, error))
    }
  }
}
