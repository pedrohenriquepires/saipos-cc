import React, { useEffect, useState } from 'react'
import { createRoute } from 'app-route-manager'
import { useTask } from 'app-hooks'
import { Board, Button, Header, Input } from 'app-components'
import { formToObject } from 'app-helpers'

import './home.style.scss'
import { ERRORS } from 'app-constants'

export const Home = () => {
  const { fetchTasks, outOfWork, createTask } = useTask()
  const [newTaskVisible, setNewTaskVisible] = useState(false)
  const [emailError, setEmailError] = useState()

  useEffect(() => {
    fetchTasks()
  }, [])

  const addNewTask = async e => {
    e.preventDefault()

    try {
      const data = formToObject(e.target)

      await createTask(data)
      setNewTaskVisible(false)
    } catch (error) {
      const { message, data } = error.response.data

      const isEmailNotValid = message === ERRORS.EMAIL_NOT_VALID

      if (isEmailNotValid) {
        setEmailError({
          message: 'E-mail inválido',
          suggestion: data.didYouMean,
        })
      }
    }
  }

  const renderNewTaskForm = () => {
    if (newTaskVisible) {
      return (
        <div className="home__new-task">
          <form onSubmit={addNewTask}>
            <Input
              type="text"
              name="description"
              label="Descrição"
              id="newTaskDescription"
            />
            <Input
              type="text"
              name="ownerName"
              label="Nome"
              id="newTaskOwnerName"
            />
            <Input
              type="text"
              name="ownerEmail"
              label="E-mail"
              id="newTaskOwnerEmail"
              error={emailError}
            />

            <Button variants={['success']} type="submit">
              Enviar
            </Button>
            <Button
              variants={['error']}
              onClick={() => setNewTaskVisible(false)}
            >
              Cancelar
            </Button>
          </form>
        </div>
      )
    }
  }

  return (
    <div className="home">
      <Header />

      <div className="container">
        <div className="home__actions">
          <Button
            variants={['success']}
            onClick={() => setNewTaskVisible(true)}
          >
            Nova Tarefa
          </Button>
          <Button variants={['success']} onClick={outOfWork}>
            Estou sem tarefas
          </Button>
        </div>

        {renderNewTaskForm()}
        <Board />
      </div>
    </div>
  )
}

createRoute({
  path: '/home',
  component: Home,
})
