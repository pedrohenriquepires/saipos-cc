import { ITask, Task, TaskStatusEnum } from './task.model'
import Knex from 'knex'

export interface ITasksRepository {
  create(task: ITask): Promise<Task>
  delete(id: string): Promise<void>
  get(): Promise<Task[]>
  getById(id: string): Promise<Task | undefined>
  update(task: ITask): Promise<Task>
  complete(id: string): Promise<void>
  refuse(id: string): Promise<void>
}

export class TasksRepository implements ITasksRepository {
  constructor(private database: Knex) {}

  async create(taskData: ITask): Promise<Task> {
    const task = new Task(taskData)

    await this.database.insert(task).into('tasks')

    return task
  }

  async delete(id: string): Promise<void> {
    await this.database.from<Task>('tasks').where('id', id).delete()
  }

  async get(): Promise<Task[]> {
    return await this.database.select('*').from<Task>('tasks')
  }
  
  async getById(id: string): Promise<Task | undefined> {
    return await this.database.select('*').from<Task>('tasks').where('id', id).first()
  }

  async update(taskData: ITask): Promise<Task> {
    const task = new Task(taskData)

    await this.database.update(task).from<Task>('tasks').where('id', task.id)

    return task
  }

  async complete(id: string): Promise<void> {
    await this.database.update('status', TaskStatusEnum.DONE).from<Task>('tasks').where('id', id)
  }

  async refuse(id: string): Promise<void> {
    await this.database.update('status', TaskStatusEnum.PENDING).increment('refusedCount', 1).from<Task>('tasks').where('id', id)
  }
}
