import express from 'express'

import { taskCreateController } from './create'
import { taskListController } from './list'
import { taskDeleteController } from './delete'
import { taskCompleteController } from './complete'
import { taskRefuseController } from './refuse'
import { taskGenerateController } from './generate'

const router = express.Router()

router.get('/', taskListController.handle.bind(taskListController))
router.post('/', taskCreateController.handle.bind(taskCreateController))
router.delete('/:id', taskDeleteController.handle.bind(taskDeleteController))
router.post('/:id/complete', taskCompleteController.handle.bind(taskCompleteController))
router.post('/:id/refuse', taskRefuseController.handle.bind(taskRefuseController))
router.post('/generate', taskGenerateController.handle.bind(taskGenerateController))

export { router }
