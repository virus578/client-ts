// 路由的类型
import { Route } from 'vue-router'
import router from './router'
// 跳转路由进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { LoginModule } from '@/store/modules/login'
import { PermissionModule } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to: Route, from: Route, next: any) => {
  // Start progress bar
  NProgress.start()

  // Determine whether the user has logged in
  if (sessionStorage.getItem('token')) {
    // 有token 不需要登录 重定向到首页
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      /*
       权限判断(不使用权限注释以下代码)
       并修改TagView/index.vue和Sidebar/index下的index.vue的routes
       */
      if (LoginModule.roles.length === 0) {
        LoginModule.SET_ROLES((+(sessionStorage.getItem('route') as string) ? ['admin'] : ['editor']))
        // 根据权限过滤路由
        PermissionModule.GenerateRoutes(LoginModule.roles)
        // 添加路由
        router.addRoutes(PermissionModule.dynamicRoutes)
        // 确保路由添加完成
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done()

  // set page title
  // document.title = to.meta.title
})
