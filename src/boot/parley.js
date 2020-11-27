const config = require('../config.js');

export default ({ Vue }) => {
  // Attach configuration object to Vue prototype for access in the application
  Vue.prototype.$parley = {
    ...config,
  };
};
