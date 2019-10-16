import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import {
  getTable,
  changeSatus,
  changeMessage,
  updatapassworld,
  showlog,
  adduser
} from '@/api/user-manager'

interface IuserManagerState {
  count: number,
  data: Array<userData>
}

interface userData {
  id: number,
  user_id: number,
  username: string,
  supplier_id: number,
  email: string,
  status: number,
  supplier_name: string,
  last_login_time: string,
  status_text: string
}

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

interface log {
  id: number,
  user_id: number,
  type: number,
  remark: string,
  operator_id: number,
  operator: string,
  operator_account_type: number,
  create_time: string,
  type_text: string,
  account_type_text: string
}

interface adduser {
  username: string,
  email: string,
  status: number,
}

@Module({ dynamic: true, store, name: 'UserManager' })
class UserManager extends VuexModule implements IuserManagerState {
  count: number = 0
  data: Array<userData> = []
  log: Array<log> = []
  @Mutation
  private SET_TABLE(val: Array<userData>) {
    this.data = val
  }
  @Mutation
  private SET_COUNT(val: number) {
    this.count = val
  }
  @Mutation
  private SET_LOG(val: Array<log>) {
    this.log = val
  }
  @Action
  public async GETTABLE(search: tableIF) {
    const res: any = await getTable(search).then(res => res)
    this.SET_TABLE(res.data)
    this.SET_COUNT(res.count)
  }
  @Action
  public changeStatus(val: status) {
    return changeSatus(val)
  }
  @Action
  public changeMessage(val: message) {
    return changeMessage(val)
  }
  @Action
  public updatapassworld(val: userId) {
    return updatapassworld(val)
  }
  @Action
  public async showlog(val: userId) {
    await showlog(val).then((res: any) => {
      this.SET_LOG(res)
    })
  }
  @Action
  public add_user(val: adduser) {
    return adduser(val)
  }
}
export const UserManagerModule = getModule(UserManager)
