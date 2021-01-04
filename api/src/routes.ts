import express from 'express'
import { router as usersRouter } from './modules/tasks/endpoints'

export function getAppRouter() {
  const router = express.Router()

  router.use('/tasks', usersRouter)

  return router
}
