import Vue, { DirectiveOptions } from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/icons/components'
import '@/permission'
import VueLazyload from 'vue-lazyload'
import * as directives from '@/directives'
Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1.3em',
  defaultHeight: '1.3em'
})

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/img/error-picture.png',
  loading: '/static/img/loading.gif',
  attempt: 1
})

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

Vue.config.productionTip = false
Vue.filter('filterImage', function (val: any) {
  return val.replace('_60x60', '_200x200')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
