import { App } from './app'

const PORT = process.env.PORT || 3000

console.log('Starting Server')

const app = new App({
  environment: process.env.NODE_ENV,
})

app.express.listen(PORT, () => {
  console.log('\nServer listen on port %s', PORT)
})
