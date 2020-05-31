import Vue from 'vue'
import App from './App'
import fly from '@/server/request.js'
import '@/static/css/index.scss'
import '@/static/css/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$http = fly
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
