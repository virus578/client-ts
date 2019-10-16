import { request } from '@/utils/http'

// 登录
export const login = (data: { username: string, password: string, captcha: string }) => request('post|supplier/token', data)
// 退出登录
export const ExitLogin = () => request('delete|supplier/token')
// 刷新 token
export const RefreshToken = () => request('post|supplier/refresh_token')
// 获取用户信息
export const AccountInfo = () => request('get|supplier/account-info')
