import { ITasksRepository } from '../../tasks.repository'

export class TaskCompleteService {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.tasksRepository.complete(id)
    } catch (error) {
      throw error
    }
  }
}
