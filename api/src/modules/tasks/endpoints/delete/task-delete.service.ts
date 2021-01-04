import { ITasksRepository } from '../../tasks.repository'

export class TaskDeleteService {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.tasksRepository.delete(id)
    } catch (error) {
      throw error
    }
  }
}
