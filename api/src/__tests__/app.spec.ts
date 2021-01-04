import { App } from '../app'

describe('App', () => {
  it('sould create express app', () => {
    const app = new App({
      environment: 'testing',
    })
    expect(typeof app.express).toBe('function')
  })
})
