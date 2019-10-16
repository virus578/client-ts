import { request } from '@/utils/http'

// 获取供应商信息
export const Supplier_Info = () => request('get|supplier/user/index')
