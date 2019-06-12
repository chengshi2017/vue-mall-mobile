import axios from 'axios';
import { getHost } from '@/utils/tools';
import { Toast } from 'vant';
import router from '@/router';

const baseUrl = getHost('VUE_APP_BASE_API');
const service = axios.create({
  baseURL: baseUrl,
  timeout: process.env['AXIOS_TIMEOUT'],
  withCredentials: true
});

const queue: { requestUrl: String; cancel: Function }[] = [];
const cancelToken = axios.CancelToken;
const requestUrl = (config: any) => {
  return `${config.url}_${config.method}`;
};

const removeQuque = (config: any) => {
  queue.forEach((item, index) => {
    if (item.requestUrl === requestUrl(config)) {
      item.cancel();
      queue.splice(index, 1);
    }
  });
};

service.interceptors.request.use(
  (config: any) => {
    removeQuque(config);
    config.cancelToken = new cancelToken(c => {
      queue.push({
        requestUrl: requestUrl(config),
        cancel: c
      });
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    removeQuque(response.config);
    if (response.status === 200) {
      return response.data;
    }
  },
  error => {
    switch (error.status) {
      case 401:
        router.push({ name: 'login' });
        break;
      case undefined:
        break;
      default:
        Toast.fail('服务器开小差了~稍后重试');
    }
    return Promise.reject(error);
  }
);
