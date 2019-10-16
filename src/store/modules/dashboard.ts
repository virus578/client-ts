import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { Message } from 'element-ui'
import { Supplier_Info } from '@/api/dashboard'
export interface ISupplierInfo {
  supplier_info: {
    date: string,
    company_name: string,
    finish_order_all: number,
    finish_order_month: number,
    finish_order_today: number
  }
}
@Module({ dynamic: true, store, name: 'SupplierInfo' })
class SupplierInfo extends VuexModule implements ISupplierInfo {
  public supplier_info = {
    date: '',
    company_name: '',
    finish_order_all: 0,
    finish_order_month: 0,
    finish_order_today: 0
  }
  @Mutation
  private SET_SUPPLIERINFO(payload: any) {
    this.supplier_info = payload
  }
  @Action
  public async Get_Supplie_Info() {
    let _res = await Supplier_Info()
    this.SET_SUPPLIERINFO(_res)
  }
}
export const SupplierInfoModule = getModule(SupplierInfo)
