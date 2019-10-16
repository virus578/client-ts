import { request } from '@/utils/http'

// 下载打印机插件
export const getPrintExe = () => request('get|supplier/printer-plugin')

// 打印标签模板
export const getLabelTemplate = (data: {warehouse_id:any}) => request('get|supplier/label', data)

// 打印标签数据
export const getPrintData = (data: {sku_ids:any, order_id:any, order_detail_ids:any, label_id:any}) => request('get|supplier/label-data', data)
