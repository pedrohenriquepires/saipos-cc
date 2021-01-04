import { database } from '../../../../datasources/knex'
import { TasksRepository } from '../../tasks.repository'
import { TaskDeleteController } from './task-delete.controller'
import { TaskDeleteService } from './task-delete.service'

const tasksRepository = new TasksRepository(database)

const taskDelete = new TaskDeleteService(tasksRepository)
const taskDeleteController = new TaskDeleteController(taskDelete)

export { taskDeleteController }
