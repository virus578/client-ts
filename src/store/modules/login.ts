import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import router, { resetRouter } from '@/router'
import { login, ExitLogin, RefreshToken, AccountInfo } from '@/api/login'
import { TagsViewModule } from './tags-view'
export interface IloginState {
  username: string
  is_should_modify_password: number
  roles: string[]
}
@Module({ dynamic: true, store, name: 'login' })
class Login extends VuexModule implements IloginState {
  public is_should_modify_password = 1
  public timeId: any = ''
  public username = '1'
  public roles: string[] = []

  @Mutation
  public SET_ROLES(roles: string[]) {
    console.log('setRoles ', roles)
    this.roles = roles
    console.log('this', this)
  }
  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username
  }
  @Mutation
  public SET_TIME_Id(timeId: any) {
    this.timeId = timeId
  }
  @Mutation
  public SET_MODIFY(modify: number) {
    this.is_should_modify_password = modify
  }
  @Mutation
  public ClEAR_SESSION() {
    window.clearInterval(this.timeId)
  }
  @Action
  public async GetLogin(userInfo: { username: string; password: string, captcha: string, captcha_uuid: string }) {
    let res: any = await login(userInfo)
    console.log(res)
    let { account_type, is_should_modify_password } = res
    sessionStorage.setItem('route', account_type)
    sessionStorage.setItem('modify', is_should_modify_password)
    // this.SET_ROLES(account_type ? ['admin'] : ['user'])
    this.AccountInfo()
  }

  @Action
  public async ExitLogin() {
    await ExitLogin() // 请求退出接口
    resetRouter() // 退出清空路由
    this.ClEAR_SESSION() // 退出清空token定时请求
    this.SET_ROLES([]) // 退出清空权限
    TagsViewModule.clearView() // 退出清空标签
    sessionStorage.removeItem('token') // 清除token
    router.push(`/login`) // 返回首页
  }
  @Action
  public async RefreshToken() {
    const _res: any = await RefreshToken().then(res => res)
    sessionStorage.setItem('token', _res.access_token)
  }

  @Action
  public async AccountInfo() {
    let _res: any = await AccountInfo().then(res => res)
    this.SET_USERNAME(_res.account_info.username)
  }
}
export const LoginModule = getModule(Login)
