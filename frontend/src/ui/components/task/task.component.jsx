import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './task.style.scss'
import { useTask } from 'app-hooks'
import { TASK_STATUS } from 'app-constants'
import { Button } from 'app-components'
import { CheckIcon, RefuseIcon, TrashIcon } from 'app-images'
import { dateFormat, formToObject } from 'app-helpers'
import { Input } from '../input/input.component'

export const Task = ({ task }) => {
  const { id, description, status, refusedCount, ownerName, createdAt } = task
  const { completeTask, refuseTask, removeTask } = useTask()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleDoneTask = () => {
    completeTask(id)
  }

  const handleRefuseTask = async e => {
    e.preventDefault()
    const { password } = formToObject(e.target)

    await refuseTask(id, password)
    setIsPasswordVisible(false)
  }

  const handleRemoveTask = () => {
    removeTask(id)
  }

  const renderActionButton = () => {
    const isDone = status === TASK_STATUS.DONE

    const content = isDone ? <RefuseIcon /> : <CheckIcon />
    const action = isDone ? () => setIsPasswordVisible(true) : handleDoneTask
    const isDisabled = isDone && refusedCount >= 2
    const variants = ['icon', isDone ? 'error' : 'success']

    return (
      <Button variants={variants} onClick={action} disabled={isDisabled}>
        {content}
      </Button>
    )
  }

  const renderTaskContent = () => (
    <div className="task__content">
      <div className="task__description">{description}</div>
      <div className="task__owner">
        <div>Criada por {ownerName}</div>
        <div>Em {dateFormat(createdAt)}</div>
      </div>
    </div>
  )

  const renderRefusePassword = () => {
    return (
      <form className="task__password" onSubmit={handleRefuseTask}>
        <Input type="password" name="password" label="Senha" />
        <Button type="submit" variants={['error']}>
          Recusar
        </Button>
        <Button onClick={() => setIsPasswordVisible(false)}>Cancelar</Button>
      </form>
    )
  }

  return (
    <div className="task">
      <div className="task__actions">{renderActionButton()}</div>

      {isPasswordVisible ? renderRefusePassword() : renderTaskContent()}

      {!isPasswordVisible && (
        <div className="task__remove">
          <Button onClick={handleRemoveTask} variants={['icon']}>
            <TrashIcon />
          </Button>
        </div>
      )}
    </div>
  )
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
}
