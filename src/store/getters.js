/**
 * ============================================================
 * Parley Vuex Getters
 * ============================================================
 */

export default {

  /**
   * Getter: Canvas Domain Environment URL
   * ------------------------------------------------------------
   * Returns the Canvas domain environment URL depending on which environment the user has set.
   *
   * @param {Object} state - Vuex state
   * @param {String} state.config.environment - Canvas environment. Allowed: 'production', 'test', and 'beta'
   */
  canvasEnvironmentURL: (state) => {
    let environmentDomain;
    switch (state.config.environment.toLowerCase()) {
      case 'test':
        environmentDomain = 'test.instructure.com';
        break;
      case 'beta':
        environmentDomain = 'beta.instructure.com';
        break;
      default:
        environmentDomain = 'instructure.com';
    }
    return environmentDomain;
  },

  /**
   * Getter: Canvas URL
   * ------------------------------------------------------------
   * Returns the full Canvas URL with set organization and environment subdomains
   *
   * @param {Object} state - Vuex state
   * @param {String} state.config.organization - Canvas organization
   * @param {Object} getters - Vuex getters
   * @param {String} getters.canvasEnvironmentURL - Canvas URL with environment subdomain
   */
  canvasURL: (state, getters) => `https://${state.config.organization}${getters.canvasEnvironmentURL}/`,

};
