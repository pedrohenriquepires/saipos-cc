import { database } from '../../../../datasources/knex'
import { TasksRepository } from '../../tasks.repository'
import { TaskListController } from './task-list.controller'
import { TaskListService } from './task-list.service'

const tasksRepository = new TasksRepository(database)

const taskList = new TaskListService(tasksRepository)
const taskListController = new TaskListController(taskList)

export { taskListController }
