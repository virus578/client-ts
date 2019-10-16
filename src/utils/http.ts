import axios from 'axios'
import router from '../router'
import Cookies from 'js-cookie'
import { LoginModule } from '@/store/modules/login'
import { Message } from 'element-ui'
export const baseURL = process.env.VUE_APP_BASE_API

export const server = axios.create({ baseURL, timeout: 0 })
server.interceptors.request.use(
  config => {
    let token: any
    if (config.headers.Authorization) {
      token = config.headers.Authorization
    } else {
      token = sessionStorage.getItem('token')
    }
    config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

server.interceptors.response.use(
  (response): any => {
    const resData = response
    if (resData.data.access_token && resData.status === 200) {
      sessionStorage.setItem('token', resData.data.access_token)
      return Promise.resolve(resData.data)
    } else {
      if (resData.status === 200) {
        return Promise.resolve(resData.data)
      }
    }
  },
  async (error: any) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear()
      Message.error('身份已过期，请重新登录')
      sessionStorage.removeItem('token')
      router.push(`/login`)
      await LoginModule.ClEAR_SESSION()
    } else {
      console.error(error.response.data)
      Message.error(error.response.data)
      return Promise.reject(error.response.data)
    }
  }
)

export const request = (
  api: string,
  data = {},
  headers = { 'Content-Type': 'application/json' },
  responseType = ''
) => {
  let [method, url] = [...api.split('|')]
  if (method === 'get') {
    return server(<object>{ url, method, params: data, headers, responseType })
  } else {
    return server(<object>{ url, method, data, headers, responseType })
  }
}
