import axios from 'axios'
import { CONFIGS } from 'app-constants'
import { useMemo } from 'react'

export const useApi = path => {
  const instance = useMemo(
    () =>
      axios.create({
        baseURL: CONFIGS.API_URL,
      }),
    []
  )

  const callApi = async ({ url, data, ...config }) => {
    config.url = buildUrl(url)
    config.data = buildData(data)

    const result = await instance.request(config)

    return result.data
  }

  const buildData = data => data || null
  const buildUrl = url => (url ? `${path}/${url}` : path)

  return {
    get: (url, config = {}) => callApi({ method: 'GET', url, ...config }),
    post: (url, data, config = {}) =>
      callApi({ method: 'POST', url, data, ...config }),
    put: (url, data, config = {}) =>
      callApi({ method: 'PUT', url, data, ...config }),
    del: (url, config = {}) => callApi({ method: 'DELETE', url, ...config }),
  }
}
