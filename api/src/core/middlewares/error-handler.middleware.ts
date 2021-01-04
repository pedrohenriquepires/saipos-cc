import { HttpError } from 'http-errors'
import { EmailError } from '../utils/email-error'

export function getErrorHandler() {
  return (error: HttpError | EmailError, req: any, res: any, next: any) => {
    const { message, data, status, ...rest } = error

    if (!status || status === 500) {
      throw error
    }

    const errorObject: {
      status: number
      message: string
      data?: object,
      error: object
    } = {
      status,
      message,
      data,
      error: rest
    }

    return res.status(error.status).json(errorObject)
  }
}
