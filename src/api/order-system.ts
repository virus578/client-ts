import { request } from '@/utils/http'

// 获取打印中
export const purchase_order = (data: any) => request('get|supplier/purchase-order', data)
// 获取未完结采购单
export const purchase_order_pedding = (data: any) => request('get|supplier/purchase-order/get-one', data)
// 获取结算方式
export const balance_type = () => request('get|supplier/balance-type')
