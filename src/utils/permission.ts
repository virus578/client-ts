// v-permission 判断不了的动态渲染dom情况通过v-if判断
import { LoginModule } from '@/store/modules/login'
const hasPermission = (value: any, path: any) => {
  // 在页面的生命周期通过判断href 知道role (不然会重复判断)
  const roles = LoginModule.roles
  if (value && value instanceof Array && value.length > 0) {
    const permissionRoles = value
    const hasPermission = roles.some(role => permissionRoles.includes(role))
    if (!hasPermission) {
      return true
    }
  } else {
    return false
  }
}
