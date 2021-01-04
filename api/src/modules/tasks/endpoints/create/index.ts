import { database } from '../../../../datasources/knex'
import { TasksRepository } from '../../tasks.repository'
import { TaskCreateController } from './task-create.controller'
import { TaskCreateService } from './task-create.service'

const tasksRepository = new TasksRepository(database)

const taskCreate = new TaskCreateService(tasksRepository)
const taskCreateController = new TaskCreateController(taskCreate)

export { taskCreateController }
