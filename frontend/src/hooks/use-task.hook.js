import { useGlobalTasks } from 'app-providers'
import { useApi } from './use-api.hook'

export const useTask = () => {
  const { get, post, del } = useApi('tasks')
  const [tasks, setTasks] = useGlobalTasks()

  const fetchTasks = async () => {
    const tasks = await get()
    setTasks(tasks)
  }

  const createTask = async data => {
    await post('', data)
    fetchTasks()
  }

  const removeTask = async id => {
    await del(id)
    fetchTasks()
  }

  const completeTask = async taskId => {
    await post(`${taskId}/complete`)
    fetchTasks()
  }

  const refuseTask = async (taskId, password) => {
    await post(`${taskId}/refuse`, {
      password,
    })

    fetchTasks()
  }

  const outOfWork = async () => {
    await post('generate')
    fetchTasks()
  }

  const getById = id => tasks.find(task => task.id === id)

  return {
    fetchTasks,
    tasks,
    completeTask,
    refuseTask,
    getById,
    outOfWork,
    createTask,
    removeTask,
  }
}
