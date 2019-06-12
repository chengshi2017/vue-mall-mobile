import createIcon from './CreateIcon';
import { getHost } from '@/utils/tools';

// 需要去对应环境的配置文件下修改
const IconfontUrl: String = getHost('VUE_APP_URL');

const IconCite = createIcon({
  scriptUrl: IconfontUrl
});

const icon = {
  install(Vue: any) {
    Vue.component('icon', IconCite);
  }
};

export default icon;
