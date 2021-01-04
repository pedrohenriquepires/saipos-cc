import request from 'supertest'
import { database } from '../../../datasources/knex'
import { expressTestApp } from '../../../__tests__/utils/get-express-test-app'

describe('Task List Controller', () => {
  beforeEach(async () => {
    await database('tasks').truncate()
  })

  afterAll(async () => {
    await database.destroy()
  })

  it('should return an empty list with no tasks', async () => {
    const response = await request(expressTestApp).get('/tasks').send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it('should return a list with 1 tasks', async () => {
    const TASK = {
      description: 'Lorem ipsum',
      ownerName: 'Teste',
      ownerEmail: 'fake@test.com'
    }
    
    const createdTask = (await request(expressTestApp).post('/tasks').send(TASK)).body
    const response = await request(expressTestApp).get('/tasks').send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual([createdTask])
  })
})
