import React from 'react'

import { AppProvider } from 'app-providers'
import { AppRoutes } from 'app-router'

import 'app-styles/main.scss'

export const Main = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
