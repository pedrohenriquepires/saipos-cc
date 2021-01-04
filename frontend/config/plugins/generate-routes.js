const routes = []

const extractContent = (source, type) => {
  const splitted = source.split(type + ' ')[1]

  if(!splitted) {
    return null
  }

  return splitted.split('\n')[0]
}

const mountRouteObject = source => {
  const path = extractContent(source, '@Route')
  const component = extractContent(source, '@Component')
  const isPrivate = source.includes('@Private')

  if(!path || !component) {
    return null
  }

  return {
    path,
    component,
    isPrivate,
    exact: true
  }
}

const routeIndex = routePath => routes.map(r => r.path).indexOf(routePath)

module.exports = source => {
  const routeObject = mountRouteObject(source)

  if(!routeObject) {
    return source
  } else {
    const routeIndexInArray = routeIndex(routeObject.path)

    if(routeIndexInArray === -1) {
      routes.push(routeObject)
    } else {
      routes[routeIndexInArray] = routeObject
    }

    return source + `; 
      if(
        !document.ROUTES || 
        document.ROUTES.length <= ${JSON.stringify(routes)}.length &&
        JSON.stringify(document.ROUTES) !== ${JSON.stringify(routes)}
      ) {
        document.ROUTES = ${JSON.stringify(routes)}
      }
    `
  }
}