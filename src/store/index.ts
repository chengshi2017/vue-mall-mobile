import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import createLogger from 'vuex/dist/logger';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {},
  mutations: {},
  actions: {},
  getters,
  strict: false, // 设置运行模式
  plugins: debug ? [createLogger()] : [] //在调试模式下加入日志
});
