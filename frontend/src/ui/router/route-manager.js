const routes = []

export const createRoute = ({ path, component, exact = true }) => {
  routes.push({
    path,
    component,
    exact,
  })
}

export const getRoutes = () => routes
