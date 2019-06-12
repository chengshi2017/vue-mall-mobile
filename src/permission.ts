import Vue from 'vue';
import Store from './store';
import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const whiteList: Array<String> = ['login'];

router.beforeEach((to, from, next) => {
  NProgress.start();
});
