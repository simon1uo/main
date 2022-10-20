import axios, { AxiosResponse } from 'axios'

axios.defaults.withCredentials = true

const REQUESTIP = 'http://localhost:9000'

export function generateHttpApi(method: 'get' | 'post') {
  return async (url: string, params?: any) => {
    const data =
      method === 'get'
        ? {
            params,
          }
        : {
            data: params,
          }
    url = REQUESTIP + url
    try {
      const response = await axios({
        url,
        method,
        ...data,
      })
      return response.data
    } catch (error) {
      return await Promise.reject(error)
    }
  }
}

export const get = generateHttpApi('get')
export const post = generateHttpApi('post')
