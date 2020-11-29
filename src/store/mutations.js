/**
 * ============================================================
 * Parley Vuex Mutations
 * ============================================================
 */

// Imports
export default {

  replaceStore(state, newState) {
    this.replaceState(newState);
  },

  /**
  * Mutation: Save Parley Settings
  * ------------------------------------------------------------
  * This mutation will save Parley configuration settings.
  *
  * @param {Object} state - Vuex state
  * @param {Object} payload - Settings to be saved
  * @param {String} [payload.organization] - Canvas organization subdomain
  * @param {String} [payload.environment] - Canvas environment. Allowed: 'production', 'test', and 'beta'
  */
  saveSettings(state, payload) {
    // Save Organization Setting
    if (payload.organization) {
      state.config.organization = payload.organization;
    }

    // Save Environment Settings
    if (payload.environment && ['production', 'beta', 'test'].includes(payload.environment)) {
      state.config.environment = payload.environment;
    }

    if (payload.configLocation) {
      state.config.location = payload.configLocation;
    }

    if (payload.appVersion) {
      state.config.version.app = payload.appVersion;
    }
  }, // END: saveSettings


  /**
  * Mutation: Add Profile
  * ------------------------------------------------------------
  * This mutation will add a new profile.
  *
  * @param {Object} state - Vuex state
  * @param {Object} profile - Profile to be added
  * @param {Number} profile.id - ID of Canvas User
  * @param {String} profile.token - Token of Canvas User
  * @param {String} profile.login - Username of Canvas User
  * @param {String} profile.name - Name of Canvas User
  * @param {String} profile.email - Email of Canvas User
  * @param {String} profile.avatar - Avatar URL of Canvas User
  * @param {String} profile.lti - LTI User ID of Canvas User
  */
  addProfile(state, profile) {
    if (!state.profiles[profile.id]) {
      state.profiles[profile.id] = profile;
    }
  },

};
