import { ITask } from '../../task.model'

export interface ITaskListDTO
  extends Pick<ITask, 'id' | 'status'> {}
