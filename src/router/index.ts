import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

Vue.use(Router)

/*
  注意: 子菜单仅在子级时出现。
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             使用<keep-alive>时需要名称字段，它还应匹配其组件的名称属性
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      如果设置为"无重定向"，则单击痕迹时不会触发重定向操作
    roles: ['admin', 'editor']   将控制页面角色（允许设置多个角色）
    title: 'title'               子菜单和面包屑导航中显示的名称（推荐设置）
    icon: 'svg-name'             侧边栏中显示的图标
    hidden: true                 如果为 true，此路由将不会显示在侧边栏中（默认值为 false）
    alwaysShow: true             如果为 true，则始终显示根菜单（默认值为 false）
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            如果为 false，则在具有小于或等于一个子路由时隐藏根菜单
    noCache: true                如果为 true，则不会缓存页面（默认值为 false）
    affix: true                  如果为 true，则标记将粘贴在标签视图中
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
*/

/**
  ConstantRoutes
  没有权限的页面
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'home',
          affix: true
        }
      }
    ]
  },
  {
    path: '/individual-message',
    name: 'individual-message',
    component: Layout,
    children: [
      {
        path: '/individual',
        name: 'individual',
        component: () => import(/* webpackChunkName: "individual" */ '@/views/individual/index.vue'),
        meta: {
          // tagView标签页名称
          title: '个人中心', icon: 'user'
        }
      }
    ]
  },
  // {
  //   path: '/User',
  //   name: 'User',
  //   component: Layout,
  //   meta: {
  //     hidden: true
  //   },
  //   children: [
  //     {
  //       path: '/user-manager',
  //       name: 'userManager',
  //       component: () => import(/* webpackChunkName: "userManager" */'@/views/user-manager/index.vue'),
  //       meta: {
  //         // tagView标签页名称
  //         title: '用户管理', icon: 'icon_shouye '
  //       }
  //     }
  //   ]
  // },
  {
    path: '/order-system',
    name: 'orderSystem',
    component: Layout,
    children: [
      {
        path: '/shipping-management',
        name: 'shippingManagement',
        component: () => import(/* webpackChunkName: "shipping-management" */'@/views/order-system/shipping-management/index.vue'),
        meta: {
          // tagView标签页名称
          title: '发货管理', icon: 'truck'
        }
      }
    ]
  }
]
/**
 *asyncRoutes
 *需要权限验证的路由
 */
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/User',
    name: 'User',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: '/user-manager',
        name: 'userManager',
        component: () => import(/* webpackChunkName: "userManager" */'@/views/user-manager/index.vue'),
        meta: {
          // tagView标签页名称
          title: '用户管理',
          icon: 'user-manager',
          roles: ['admin']
        }
      }
    ]
  }
  // roles: ['editor', 'admin']  admin/editor都显示此路由
  // {
  //   path: 'directive',
  //   component: () => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/directive.vue'),
  //   name: 'DirectivePermission',
  //   meta: {
  //     title: 'directivePermission'
  //     // 如果不设置权限，则表示：此页面不需要权限
  //   }
  // }
  // 路由过长可以拆分路由 import route modules
]
// export const adminRoutes: RouteConfig[] = [
//   {
//     path: '/login',
//     component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
//     meta: { hidden: true }
//   },
//   {
//     path: '/404',
//     component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
//     meta: { hidden: true }
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     children: [
//       {
//         path: 'dashboard',
//         component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
//         meta: {
//           title: '首页', icon: 'icon_shouye '
//         }
//       }
//     ]
//   },
//   {
//     path: '/User',
//     name: 'User',
//     component: Layout,
//     children: [
//       {
//         path: '/user-manager',
//         name: 'userManager',
//         component: () => import(/* webpackChunkName: "userManager" */'@/views/user-manager/index.vue'),
//         meta: {
//           // tagView标签页名称
//           title: '用户管理', icon: 'icon_shouye '
//         }
//       }
//     ]
//   },
//   {
//     path: '/individual-message',
//     name: 'individual-message',
//     component: Layout,
//     children: [
//       {
//         path: '/individual',
//         name: 'individual',
//         component: () => import(/* webpackChunkName: "individual" */ '@/views/individual/index.vue'),
//         meta: {
//           // tagView标签页名称
//           title: '个人中心', icon: 'icon-gerenzhongxin'
//         }
//       }
//     ]
//   },
//   {
//     path: '/order-system',
//     name: 'orderSystem',
//     component: Layout,
//     children: [
//       {
//         path: '/shipping-management',
//         name: 'shippingManagement',
//         component: () => import(/* webpackChunkName: "shipping-management" */'@/views/order-system/shipping-management/index.vue'),
//         meta: {
//           // tagView标签页名称
//           title: '发货管理', icon: 'icon_shouye'
//         }
//       }
//     ]
//   },
//   {
//     path: '*',
//     redirect: '/404',
//     meta: { hidden: true }
//   }
// ]

// 创建路由
export const createRouter = () => new Router({
  mode: 'history', // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// 清除路由
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
