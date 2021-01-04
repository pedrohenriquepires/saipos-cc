import { database } from '../../../../datasources/knex'
import { TasksRepository } from '../../tasks.repository'
import { TaskRefuseController } from './task-refuse.controller'
import { TaskRefuseService } from './task-refuse.service'

const tasksRepository = new TasksRepository(database)

const taskRefuse = new TaskRefuseService(tasksRepository)
const taskRefuseController = new TaskRefuseController(taskRefuse)

export { taskRefuseController }
