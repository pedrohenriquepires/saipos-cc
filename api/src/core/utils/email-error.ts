import { HttpError } from "http-errors"

export class EmailError implements HttpError {
  name: string = 'email-error'
  status: number = 400
  statusCode: number = 400
  expose: boolean = true
  message: string
  data: object

  constructor(message: string, data: object) {
    this.message = message
    this.data = data
  }
}