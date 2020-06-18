import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material';
import Vuelidate from 'vuelidate';
import Notifications from "./components/NotificationPlugin";
import 'vue-material/dist/vue-material.css';
import './assets/scss/material.scss';
import router from './router'
import store from './store'

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(Notifications);
Vue.use(Vuelidate);

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
