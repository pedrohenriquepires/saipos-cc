import path from 'path'

require('dotenv').config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
})

const log = {
  warn(message: string) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message)
    }
  },
  error(message: string) {
    console.error(message)
  },
  deprecate(message: string) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message)
    }
  },
  debug(message: string) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Knex debugger:', message)
    }
  },
}

const config = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST || '',
    user: process.env.DATABASE_USER || '',
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    filename: path.resolve('__tests__/database.sqlite'),
  },
  debug: process.env.NODE_ENV === 'development',
  log,
  useNullAsDefault: process.env.DATABASE_CLIENT === 'sqlite3',
  migrations: {
    tableName: '_migrations',
  },
}

module.exports = config
