import axios from 'axios'
import { EmailError } from '../../../../core/utils/email-error'
import { validadeObject } from '../../../../utils/validation-functions'
import { Task } from '../../task.model'
import { ITasksRepository } from '../../tasks.repository'
import { ITaskCreateDTO } from './task-create.dto'

const MAIL_BOX_KEY = 'f20f7ae318c34b92ee6a685fac758feb'

interface MailBoxResponse {
  format_valid: boolean
  mx_found: boolean
  did_you_mean: string
}

const verifyEmail = async (email: string) => {
  const { data } = await axios.get<MailBoxResponse>(`https://apilayer.net/api/check?access_key=${MAIL_BOX_KEY}&email=${email}`)
  return data
}

export class TaskCreateService {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute(data: ITaskCreateDTO): Promise<Task> {
    const { did_you_mean, format_valid, mx_found } = await verifyEmail(data.ownerEmail)

    if (!format_valid || !mx_found) {
      throw new EmailError('tasks.create.email-not-valid', {
        didYouMean: did_you_mean
      })
    }

    // Validate Data
    const task = new Task(data)
    await validadeObject(task)

    try {
      const createdTask = await this.tasksRepository.create(task)
      return createdTask
    } catch (error) {
      throw error
    }
  }
}
