import { Task } from '../../task.model'
import { ITasksRepository } from '../../tasks.repository'

export class TaskListService {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute(): Promise<Task[]> {
    try {
      return await this.tasksRepository.get()
    } catch (error) {
      throw error
    }
  }
}
