import createHttpError, { HttpError } from 'http-errors'
import { ITasksRepository } from '../../tasks.repository'

const MAX_REFUSED_COUNT = 2

export class TaskRefuseService {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute(id: string, password: string): Promise<void> {
    try {
      if(password !== "TrabalheNaSaipos") {
        throw createHttpError(401, new Error('tasks.refuse.wrong-password'))
      }

      const task = await this.tasksRepository.getById(id)

      if(!task) {
        throw new Error('tasks.refuse.task-not-found')
      }

      if(task.refusedCount >= MAX_REFUSED_COUNT) {
        throw new Error('tasks.refuse.task-refused-too-many-times')
      }

      await this.tasksRepository.refuse(id)
    } catch (error) {
      throw error
    }
  }
}
