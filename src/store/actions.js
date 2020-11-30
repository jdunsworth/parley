/**
 * ============================================================
 * Parley Vuex Actions
 * ============================================================
 */

// Imports
import storage from 'electron-json-storage';
import config from '../config.js';

export default {

  /**
   * Mutation: Initialize Store from Client
   * ----------------------------------------------------------
   * This mutation is executed on application load and will attempt to hydrate state, if available, from
   * clients local operating system. If no configuration, it will create using defaultState object.
   *
   * @param {Object} state - Vuex state
   */
  async initializeStore({ commit }) {
    // Get `parley-data` file and contents, if exists
    storage.get('parley-data', (error, data) => {
      if (error) return error;

      if (
        data
        && (data.config.version.config && data.config.version.config === config.dataVersion)
      ) {
        // Storage found, hydrate from OS
        commit('replaceStore', data);
      } else {
        // No storage found or data-version has changed. Set with default state
        storage.set('parley-data', config.defaultState);

        // Commit Settings Save
        commit('saveSettings', {
          configLocation: storage.getDataPath(),
          appVersion: config.appVersion,
        });
      }

      // Subscribe to any future state updates and persist the settings
      this.subscribe((mutation, newState) => {
        storage.set('parley-data', newState);
      });

      return data;

      /**
     * TODO: Need to make this smarter about data structure changes between data versions - Issue #1
     */
    });
  }, // END: initializeStore()


  /**
   * Mutation: Clear and Re-Initialize Store from Client
   * ------------------------------------------------------------
   * This mutation is executed on demand and will delete any existing configuration stored on clients local
   * operating system and re-create using defaultState object.
   */
  clearAndReinitializeStore({ commit }) {
    // Remove `parley-data` file, if exists
    storage.remove('parley-data');

    // Create new `parley-data` file with default state object
    storage.set('parley-data', config.defaultState);

    // Hydrate current state with default state object
    commit('replaceStore', config.defaultState);
  }, // END: clearAndReinializeStore()


};
