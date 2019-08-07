// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '../static/index.css'
import VueCookies from 'vue-cookie'

Vue.use(mavonEditor)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueCookies)
axios.default.withCredentials = true
Vue.prototype.$axios = VueAxios
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>'
})
