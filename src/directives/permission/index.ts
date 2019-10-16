import { DirectiveOptions } from 'vue'
import { LoginModule } from '@/store/modules/login'

export const permission: DirectiveOptions = {
  inserted(el, binding) {
    const { value } = binding
    const roles = LoginModule.roles
    console.log(window.location.href)
    // 在页面的生命周期通过判断href 知道role (不然会重复判断)
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => permissionRoles.includes(role))
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('need roles')
    }
  }
}
