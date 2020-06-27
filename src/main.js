import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './assets/js/routes';
import 'vue-bootstrap-selectpicker/dist/css/vue-bootstrap-selectpicker.min.css';
import VueResource from 'vue-resource';
import SelectPicker from 'vue-bootstrap-selectpicker';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(SelectPicker);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);

Vue.http.options.root = "https://interview-953d8.firebaseio.com";

const router = new VueRouter({
  routes,
  mode: 'history'
})
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
