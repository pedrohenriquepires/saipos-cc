import createGlobalState from 'react-create-global-state'
export const [useGlobalTasks, TasksProvider] = createGlobalState({
  pending: [],
  done: [],
})
