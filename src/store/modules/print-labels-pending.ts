import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { purchase_order_pedding } from '@/api/order-system'
import { Message } from 'element-ui'

interface IPrintLabelsPending {
  table: {
    data: Array<any>
  }
}
@Module({ dynamic: true, store, name: 'PrintLabelsPending' })
class PrintLabelsPending extends VuexModule implements IPrintLabelsPending {
  public table: { data: Array<any> } = {
    data: []
    // info: {
    //   id: 'PO1234567',
    //   purchase_plan_id: 'PL1234567',
    //   purchase_user: '唐唐',
    //   supply_chain_specialist: '唐一',
    //   balance_type_text: '定期结算-月结月付',
    //   supplier_id: '1213245',
    //   status_text: '打印',
    //   purchase_time: '2019-06-20 19:27:59',
    //   kind_number: 1,
    //   warehouse_id: '仓库ID',
    //   currency_code: '人命币',
    //   discount_amount: '45',
    //   shipping_cost: '8',
    //   payable_amount: '56',
    //   create_time: '2019-06-20 19:27:59',
    //   update_time: '2019-06-20 19:27:59',
    //   is_expand: false
    // },
    // detail: [
    //   {
    //     thumb: '',
    //     sku: 'EN0589500',
    //     name: '儿童周岁生日派对装饰布置背景墙套装生日气球拉旗纸扇花横幅拉花（OPP)',
    //     net_width: 10,
    //     net_length: 12,
    //     net_height: 2,
    //     net_weight: 460.00,
    //     weight: 460.00,
    //     length: 10,
    //     width: 13,
    //     height: 2,
    //     qty: 1
    //   }
    // ],
    // page: 1,
    // pageSize: 50,
    // count: 0
  }
  @Mutation
  private SET_SEARCH(res: any) {
    this.table.data = res
  }

  @Action
  public async GetSearchPedding(search: { purchase_type: string, purchase_value: string }) {
    let _res: any = await purchase_order_pedding(search)
    _res.data.forEach((item: any) => {
      item.detail.forEach((i: any) => {
        i.print_number = 1
      })
    })
    return _res
    // this.SET_SEARCH(_res)
  }
}
export const PrintLabelsPendingModule = getModule(PrintLabelsPending)
