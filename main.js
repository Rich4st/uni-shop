import App from './App'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
import store from './store'

uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'

// 封装showToast
uni.$showMsg = function(title = '数据加载失败!',duration = 1500, icon='none') {
  return uni.showToast({
            title,
            duration,
            icon
          })
}

/* 请求拦截器 */
$http.beforeRequest = function(options){
  uni.showLoading({
    title: '加载中...'
  })
}
/* /请求拦截器 */

/* 响应拦截器 */
$http.afterRequest = function(options) {
  uni.hideLoading()
}
/* /响应拦截器 */

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif