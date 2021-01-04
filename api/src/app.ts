import express, { Express } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { getErrorHandler } from './core/middlewares/error-handler.middleware'
import { getAppRouter } from './routes'

type AppParams = {
  environment?: string | undefined
}

export class App {
  public express: Express

  constructor(params: AppParams) {
    this.express = express()
    this.express.use(cors())
    this.express.use(bodyParser.json())
    this.express.use(getAppRouter())
    this.express.use(getErrorHandler())
  }
}
