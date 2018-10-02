import Vue from 'vue'
import App from './App.vue'
import {
  fb
} from './firebase'
import VueFire from 'vuefire'
import DateFilter from '../filters/dateFromatter'

Vue.config.productionTip = false

Vue.use(VueFire)
Vue.filter('data', DateFilter)

new Vue({
  render: h => h(App),
  created() {
    fb;
  }
}).$mount('#app')