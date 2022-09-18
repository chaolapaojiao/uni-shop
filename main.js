
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 导入网路请求的包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
// 这只接口
$http.baseUrl = 'https://api-ugo-web.itheima.net'
// 请求拦截器
$http.beforeRequest = function (options) {
	uni.showLoading({
		title:"加载中..."
	})
}
// 响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}
// 封装报错函数
uni.$showError=function(title="数据获取失败...",duration=1500){
	 uni.showToast({
		title:title,
		duration:duration,
		icon:'none'
	})
}
// 映入store
import store from '@/store/store.js'
App.mpType = 'app'
// 引入混入
import tabbar from '@/mixins/tabbar-badge.js'
Vue.mixin(tabbar)

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif