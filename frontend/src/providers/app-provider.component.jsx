import React from 'react'
import * as providers from 'app-providers'

const isNotAppProvider = name => name !== 'AppProvider'
const isProvider = name => /.*Provider$/.test(name)

export const AppProvider = ({ children }) => {
  return Object.keys(providers)
    .filter(isNotAppProvider)
    .filter(isProvider)
    .reduce((acc, provider) => {
      const CurrentProvider = providers[provider]

      return <CurrentProvider>{acc}</CurrentProvider>
    }, children)
}
