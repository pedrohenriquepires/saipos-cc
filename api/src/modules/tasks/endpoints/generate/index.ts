import { database } from '../../../../datasources/knex'
import { TasksRepository } from '../../tasks.repository'
import { TaskGenerateController } from './task-generate.controller'
import { TaskGenerateService } from './task-generate.service'

const tasksRepository = new TasksRepository(database)

const taskGenerate = new TaskGenerateService(tasksRepository)
const taskGenerateController = new TaskGenerateController(taskGenerate)

export { taskGenerateController }
