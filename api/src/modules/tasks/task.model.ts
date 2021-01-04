import { v4 as uuidv4 } from 'uuid'
import { IsDateString, IsEmail, IsEnum, IsInt, IsUUID, MaxLength, MinLength } from 'class-validator'

export enum TaskStatusEnum {
  PENDING = '1',
  DONE = '2'
}

export interface ITask {
  id?: string
  description: string
  status?: TaskStatusEnum
  ownerName: string
  ownerEmail: string
  createdAt?: string
  refusedCount?: number
}

export class Task implements ITask {
  @IsUUID('4')
  id: string

  @MaxLength(255)
  description: string

  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum

  @MinLength(2)
  @MaxLength(255)
  ownerName: string

  @IsEmail()
  @MaxLength(255)
  ownerEmail: string

  @IsDateString()
  createdAt: string

  @IsInt()
  refusedCount: number

  constructor(props: ITask) {
    this.id = props.id || uuidv4()
    this.description = props.description
    this.status = props.status || TaskStatusEnum.PENDING
    this.ownerName = props.ownerName
    this.ownerEmail = props.ownerEmail
    this.createdAt = props.createdAt || new Date().toISOString()
    this.refusedCount = props.refusedCount || 0
  }
}
