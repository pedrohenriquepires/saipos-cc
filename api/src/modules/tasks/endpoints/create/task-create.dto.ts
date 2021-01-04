import { ITask } from '../../task.model'

export interface ITaskCreateDTO
  extends Pick<ITask, 'description' | 'ownerName' | 'ownerEmail'> {}
