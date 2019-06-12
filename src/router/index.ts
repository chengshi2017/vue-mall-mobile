import Vue from 'vue';
import Router from 'vue-router';
import login from './config/login';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...login]
});
