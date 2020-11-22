import config from '../config.js';

export default ({ Vue }) => {
  Vue.prototype.$parley = {
    ...config,
  };
};
