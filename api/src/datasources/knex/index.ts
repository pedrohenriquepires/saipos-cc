import knex from 'knex'

const config = require('../../../knexfile')

export const database = knex(config)
