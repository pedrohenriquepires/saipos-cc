import React from 'react'
import { history } from 'app-helpers'
import { Router, Switch, Redirect } from 'react-router-dom'
import { PublicRoute } from 'app-router'
import { getRoutes } from './route-manager'
import 'app-pages'

export const AppRoutes = () => {
  const mapRoutes = () => {
    return getRoutes().map(({ component, ...route }, key) => {
      return <PublicRoute key={key} component={component} {...route} />
    })
  }

  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/home" />

        {mapRoutes()}
      </Switch>
    </Router>
  )
}
