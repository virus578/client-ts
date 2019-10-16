import { request } from '@/utils/http'

// 获取信息
export const getMessage = () => request('get|supplier/account-info')

// 修改密码
export const mdfpassworld = (data: { old_password: string, new_password: string, confirm_password: string }) => request('put|supplier/password', data)
