// Tailwind
import '@/assets/css/tailwind.css';
// Styles: SCSS
import '@/assets/scss/main.scss';
// axios
import axios from 'axios';
// Material Icons
import 'material-icons/iconfont/material-icons.css';
// PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// Vue
import Vue from 'vue';
import VueCookies from 'vue-cookies';
// Vuesax Component Framework
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'; // Vuesax
// Theme Configurations
import '../themeConfig.js';
// ACL
import acl from './acl/acl';
// App vue
import App from './App.vue';
// Globally Registered Components
import './globalComponents.js';
import { getCurrentUser } from './helpers/auth';
// i18n
import i18n from './i18n/i18n';
// Vue Router
import router from './router';
// Vuex Store
import store from './store/store';
// VeeValidate
import "./vee-validate";


Vue.use(VueCookies)

Vue.prototype.$http = axios


axios.defaults.baseURL = process.env.VUE_APP_BASE_URL_DOMAIN;


var currentUser = getCurrentUser();
if (currentUser && currentUser.access_token !== '' && currentUser.token_type !== '') {
  axios.defaults.headers.common.Authorization = `${currentUser.token_type} ${currentUser.access_token}`;
  axios.defaults.headers.common['Accept-Language'] = 'tr-TR';
}
// Feather font icon
require('./assets/css/iconfont.css')

Vue.use(require('vue-moment'));

Vue.config.productionTip = false

Vue.use(Vuesax)

const vm = new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App),
}).$mount('#app')

export { vm };

