import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './style/index.less'
// 加载Vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载amfe-flexible
import 'amfe-flexible'
import '@/utiles/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
