import { getErrorHandler } from '../middlewares/error-handler.middleware'
import createHttpError from 'http-errors'

class MockResponse {
  public jsonValue!: string
  public statusValue!: number
  status(status: number) {
    this.statusValue = status
    return this
  }
  json(json: string) {
    this.jsonValue = json
    return this
  }
}

const mockResponse = new MockResponse()

describe('CORE Error Handler', () => {
  it('getErrorHandler should return function', () => {
    // Act/Assert
    expect(typeof getErrorHandler()).toBe('function')
  })

  it('calling function with error should throw error', () => {
    // Arrange
    const errorHandler = getErrorHandler()
    const httpError = createHttpError('test')

    // Act/Assert
    expect(() => {
      errorHandler(httpError, {}, mockResponse, {})
    }).toThrow('test')
  })

  it('calling function with 400 error should return json error', () => {
    // Arrange
    const errorHandler = getErrorHandler()
    const httpError = createHttpError(400, 'test')

    // Act
    const res = errorHandler(httpError, {}, mockResponse, {})

    // Assert
    expect(res.statusValue).toBe(400)
    expect(res.jsonValue.message).toBe('test')
  })
})
