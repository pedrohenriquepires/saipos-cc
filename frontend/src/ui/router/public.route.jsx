import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { scrollHelper } from 'app-helpers'

export const PublicRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    scrollHelper.goToTop()
  }, [Component])

  return <Route {...rest} render={props => <Component {...props} />} />
}
