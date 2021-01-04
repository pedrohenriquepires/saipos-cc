import { history } from 'app-helpers'

export const goTo = (path, config) => history.push(path, config)

export const goToHome = config => goTo('/', config)

export const goBack = () => history.goBack()
