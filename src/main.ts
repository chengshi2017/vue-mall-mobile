import 'normalize.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import icon from '@/components/Icon';

Vue.use(icon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
