import { ITask } from '../../task.model'

export interface ITaskUpdateDTO
  extends Pick<ITask, 'id' | 'description' | 'ownerName' | 'ownerEmail'> {}
