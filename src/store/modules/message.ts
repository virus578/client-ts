import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { getMessage, mdfpassworld } from '@/api/message'
import { Message } from 'element-ui'
import store from '@/store'
interface account {
  username: string
  supplier_name: string
}
interface company {
  supplier_name: string
  legal: string
  qq: string
  province: string
  city: string
  area: string
  address: string
  online_shop_name: string
  link: string
  contact: string
  contact_job: string
  mobile: string
  business_license: string
  business_code: string
}
interface finance {
  transaction_type: string,
  pay_type: string,
  public_bank: string,
  public_bank_account: string,
  public_bank_city: string,
  public_bank_account_name: string,
  default_payment_method: string,
  private_bank: string,
  private_bank_account: string,
  private_bank_account_name: string,
  private_bank_city: string,
  opening_id_card: string,
  bank_retained_contact_way: string
}
interface messageIns {
  account_info: account
  company_info: company
  finance_info: finance
}

interface mfdpass {
  old_password: string,
  new_password: string,
  confirm_password: string
}

@Module({ dynamic: true, store, name: 'MessageModule' })
class Msg extends VuexModule implements messageIns {
  account_info: account = {
    username: '',
    supplier_name: ''
  }
  company_info: company = {
    supplier_name: '',
    legal: '',
    qq: '',
    province: '',
    city: '',
    area: '',
    address: '',
    online_shop_name: '',
    link: '',
    contact: '',
    contact_job: '',
    mobile: '',
    business_license: '',
    business_code: ''
  }
  finance_info: finance = {
    transaction_type: '',
    pay_type: '',
    public_bank: '',
    public_bank_account: '',
    public_bank_city: '',
    public_bank_account_name: '',
    default_payment_method: '',
    private_bank: '',
    private_bank_account: '',
    private_bank_account_name: '',
    private_bank_city: '',
    opening_id_card: '',
    bank_retained_contact_way: ''
  }
  @Mutation
  private SET_ACCOUNTINFO(val: account) {
    this.account_info = val
  }
  @Mutation
  private SET_COMPANYINFO(val: company) {
    this.company_info = val
  }
  @Mutation
  private SET_FINANCEINFO(val: finance) {
    this.finance_info = val
  }
  @Action
  public async GetMessage() {
    const res: any = await getMessage().then(res => res)
    this.SET_ACCOUNTINFO(res.account_info)
    this.SET_COMPANYINFO(res.company_info)
    this.SET_FINANCEINFO(res.finance_info)
  }
  @Action
  public mdfPassworld(data: mfdpass) {
    return mdfpassworld(data).then((res: any) => {
      Message.success('修改成功')
      return true
    })
  }
}
export const MessageModule = getModule(Msg)
