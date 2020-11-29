/**
 * ============================================================
 * Parley Configuration
 * ============================================================
 */

const config = require('../config.js');

export default ({ Vue, router, store }) => {
  // Attach configuration object to Vue prototype for access in the application
  Vue.prototype.$parley = {
    ...config.default,
  };

  // Vue Router settings interceptor
  router.beforeEach((to, from, next) => {
    if ([
      '/setup',
      '/profiles/add',
      '/settings',
    ].includes(to.path)) {
      // Don't apply if already going to setup or adding profiles.
      next();
    } else if (
      to.path !== '/setup'
      && !store.state.config.organization
    ) {
      // If organization isn't set up, then forward to setup
      next('/setup');
    } else if (
      to.path !== '/profiles/add'
      && store.state.profiles.length === 0
    ) {
      // If no profile exist, forward to add profile
      next('/profiles/add');
    } else {
      // Everything else, just go to valid route.
      next();
    }
  });
};
