import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { Message } from 'element-ui'
import { purchase_order, balance_type } from '@/api/order-system'

// interface Itabel {
//   id: string,
//   purchase_plan_id: string,
//   purchase_user: string,
//   supply_chain_specialist: string,
//   status_text: string
//   balance_type_text: string,
//   supplier_id: string,
//   purchase_time: string,
//   kind_number: number,
//   warehouse_id: string,
//   currency_code: string,
//   discount_amount: string,
//   shipping_cost: string,
//   payable_amount: string,
//   create_time: string,
//   update_time: string,
//   is_expand: boolean,
//   detail: Array<Idetail>
// }
// interface Idetail {
//   thumb: string,
//   sku: string,
//   name: string,
//   net_width: number,
//   net_length: number,
//   net_height: number,
//   net_weight: number,
//   weight: number,
//   length: number,
//   width: number,
//   height: number,
//   qty: number
// }

export interface IPrintLabelsSuccess {
  _table: {
    data: Array<any>,
    count: number
  }
}
@Module({ dynamic: true, store, name: 'PrintLabelsSuccess' })
class PrintLabelsSuccess extends VuexModule implements IPrintLabelsSuccess {
  public _table: { data: Array<any>, count: number } = {
    data: [
      // {
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
      //   is_expand: false,
      //   detail: [
      //     {
      //       thumb: '',
      //       sku: 'EN0589500',
      //       name: '儿童周岁生日派对装饰布置背景墙套装生日气球拉旗纸扇花横幅拉花（OPP)',
      //       net_width: 10,
      //       net_length: 12,
      //       net_height: 2,
      //       net_weight: 460.00,
      //       weight: 460.00,
      //       length: 10,
      //       width: 13,
      //       height: 2,
      //       qty: 1
      //     }
      //   ]
      // }
    ],
    count: 0
  }
  @Mutation
  public Expand(index: number) {
    this._table.data[index].is_expand = !this._table.data[index].is_expand
  }
  @Mutation SET_SEARCH(res: any) {
    this._table.data = res.data
    this._table.count = res.count
  }

  @Action
  public async GetSearch(search: any) {
    let _search = JSON.parse(JSON.stringify(search))
    if (_search.kind_number_min < 0) {
      Message(
        {
          message: '种类数最小值不能小于零',
          type: 'warning'
        }
      )
      return
    }
    if (_search.kind_number_max < 0) {
      Message(
        {
          message: '最大值不能小于零',
          type: 'warning'
        }
      )
      return
    }
    if (_search.kind_number_max !== '' && _search.kind_number_max !== '') {
      if (+_search.kind_number_min > +_search.kind_number_max) {
        Message(
          {
            message: '种类数最小值不能大于最大值',
            type: 'warning'
          }
        )
        return
      }
    }
    // _search.kind_number_max = _search.kind_number_max === -1 ? '' : search.kind_number_max
    _search.kind_number_min = _search.kind_number_min === '' ? 0 : search.kind_number_min
    _search.purchase_value = _search.purchase_value.replace(/\n/g, ',')
    let _res: any = await purchase_order(_search)
    _res.data = _res.data.map((item: any) => {
      return {
        is_expand: false,
        ...item
      }
    })
    this.SET_SEARCH(_res)
  }
  @Action
  public async GetBalanceType() {
    let _res = await balance_type()
    return _res
  }
}
export const PrintLabelsSuccessModule = getModule(PrintLabelsSuccess)
