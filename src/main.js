import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './assets/js/routes'
import 'vue-bootstrap-selectpicker/dist/css/vue-bootstrap-selectpicker.min.css'
import SelectPicker from 'vue-bootstrap-selectpicker'
import VueResource from 'vue-resource'

Vue.use(SelectPicker);

Vue.use(VueRouter);
Vue.use(VueResource);
const router = new VueRouter({
  routes,
  mode: 'history'
})
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
