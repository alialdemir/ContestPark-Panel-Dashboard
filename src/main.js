// Tailwind
import '@/assets/css/tailwind.css';
// Styles: SCSS
import '@/assets/scss/main.scss';
// Material Icons
import 'material-icons/iconfont/material-icons.css';
// PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// Vue
import Vue from 'vue';
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
// i18n
import i18n from './i18n/i18n';
// Vue Router
import router from './router';
// Vuex Store
import store from './store/store';



// Feather font icon
require('./assets/css/iconfont.css')



Vue.use(require('vue-moment'));



Vue.config.productionTip = false

Vue.use(Vuesax)

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App),
}).$mount('#app')
