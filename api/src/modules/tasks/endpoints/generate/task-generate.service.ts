import axios from 'axios'
import { Task } from '../../task.model'
import { ITasksRepository } from '../../tasks.repository'

export class TaskGenerateService {
  constructor(private tasksRepository: ITasksRepository) {}

  private generateTask(description: string): Task {
    return new Task({
      description,
      ownerEmail: 'eu@me.com',
      ownerName: 'Eu',
    })
  }

  async execute(): Promise<void> {
    try {
      const { data: facts } = await axios.get<[{ text: string }]>(
        'https://cat-fact.herokuapp.com/facts'
      )

      const tasksToCreate = facts
        .slice(0, 3)
        .map(fact => this.tasksRepository.create(this.generateTask(fact.text)))

      await Promise.all(tasksToCreate)
    } catch (error) {
      throw error
    }
  }
}
