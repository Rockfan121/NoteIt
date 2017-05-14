/* @flow */
import axios from 'axios'


export const API_URL = 'http://localhost:8080'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return // eslint-disable-next-line
Promise.reject(error)
  }
)

api.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    return // eslint-disable-next-line
Promise.reject(error)
  }
)

export default api
