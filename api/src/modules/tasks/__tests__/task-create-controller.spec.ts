import request from 'supertest'
import { database } from '../../../datasources/knex'
import { expressTestApp } from '../../../__tests__/utils/get-express-test-app'

const DESCRIPTION = 'Lorem ipsum'
const EMAIL = 'fake@user.com'
const NAME = 'Fake User'

describe('Task Create Controller', () => {
  beforeEach(async () => {
    await database('tasks').truncate()
  })

  afterAll(async () => {
    await database.destroy()
  })

  it('should create new task', async () => {
    const response = await request(expressTestApp).post('/tasks').send({
      description: DESCRIPTION,
      ownerName: NAME,
      ownerEmail: EMAIL,
    })

    expect(response.status).toBe(201)

    expect(response.body.description).toBe(DESCRIPTION)
    expect(response.body.ownerName).toBe(NAME)
    expect(response.body.ownerEmail).toBe(EMAIL)
  })

  it('should not create new task with invalid email', async () => {
    const response = await request(expressTestApp).post('/tasks').send({
      email: 'not-a-valid-email',
      description: DESCRIPTION,
      ownerName: NAME,
    })
    expect(response.status).toBe(400)
  })
})
