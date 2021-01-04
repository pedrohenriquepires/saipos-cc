import { database } from '../../../../datasources/knex'
import { TasksRepository } from '../../tasks.repository'
import { TaskCompleteController } from './task-complete.controller'
import { TaskCompleteService } from './task-complete.service'

const tasksRepository = new TasksRepository(database)

const taskComplete = new TaskCompleteService(tasksRepository)
const taskCompleteController = new TaskCompleteController(taskComplete)

export { taskCompleteController }
