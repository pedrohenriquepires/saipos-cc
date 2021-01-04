import { useTask } from 'app-hooks'
import React from 'react'
import { Task } from '../task/task.component'

import './board.style.scss'

const NoTasks = () => (
  <div className="board__empty">Sem tarefas no momento.</div>
)

export const Board = () => {
  const { tasks } = useTask()

  const renderPendingTask = () => {
    if (!tasks.pending.length) {
      return <NoTasks />
    }

    return tasks.pending.map((task, key) => (
      <li key={key}>
        <Task task={task}></Task>
      </li>
    ))
  }

  const renderDoneTask = () => {
    if (!tasks.done.length) {
      return <NoTasks />
    }

    return tasks.done.map((task, key) => (
      <li key={key}>
        <Task task={task}></Task>
      </li>
    ))
  }

  return (
    <div className="board">
      <div className="board__section">
        <h2 className="board__title">Tarefas Pendentes</h2>

        <ul className="board__tasks">{renderPendingTask()}</ul>
      </div>

      <div className="board__section">
        <h2 className="board__title">Tarefas Completas</h2>

        <ul className="board__tasks">{renderDoneTask()}</ul>
      </div>
    </div>
  )
}
