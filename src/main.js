import Vue from 'vue'
import App from './App'
import './styles/index.less'
import dialog from './utils/dialog.js'
Vue.prototype.$dialog = dialog
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
