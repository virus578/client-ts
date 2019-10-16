import { request } from '@/utils/http'
interface tableIF {
  page: number,
  page_size: number,
  status: number,
  username?: string,
  emails?: string
}
interface status {
  user_ids: Array<number>,
  status: string
}
interface message {
  user_id: number,
  username: string,
  email: string
}
interface userId {
  user_id: number
}

interface adduser {
  username: string,
  email: string,
  status: number,
}

export const getTable = (data: tableIF) => request('get|supplier/users', data)

export const changeSatus = (data: status) => request('put|supplier/user/status', data)

export const changeMessage = (data: message) => request('put|supplier/user', data)

export const updatapassworld = (data: userId) => request('put|supplier/user/password', data)

export const showlog = (data: userId) => request('get|supplier/user/account-logs', data)

export const adduser = (data: adduser) => request('post|supplier/user', data)
