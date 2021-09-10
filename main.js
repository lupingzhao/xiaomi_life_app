import Vue from 'vue'
import App from './App'
import utils from './utils/index.js'
import store from './store/index.js'
Vue.config.productionTip = false
import bus from './bus/index.js'

import io from '@hyoga/uni-socket.io';

const socket = io('http://localhost:3000', {
  query: {},
  transports: [ 'websocket', 'polling' ],
  timeout: 5000,
});
Vue.prototype.$socket= socket



Vue.prototype.$bus = bus
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$utils = utils




import ccUI from 'cc-ui-uni-app'

Vue.use(ccUI)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
