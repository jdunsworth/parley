/**
 * ============================================================
 * Parley Vuex Actions
 * ============================================================
 */

// Imports
import storage from 'electron-json-storage';
import config from '../config.js';

/**
 * Get Local Settings
 * ----------------------------------------------------------
 * Give electron-json-storage's get call promise support.
 */
async function getLocalSettings() {
  return new Promise((res, rej) => {
    storage.get(config.localDataFile, (err, data) => {
      if (err) rej(err);
      res(data);
    });
  });
}

export default {

  /**
   * Action: Initialize Store from Client
   * ----------------------------------------------------------
   * This action is executed on application load and will attempt to hydrate state, if available, from
   * clients local operating system. If no configuration, it will create using defaultState object.
   *
   * @param {Object} commit - Call Commit
   */
  async initializeStore({ commit }) {
    // Get local settings file and contents, if exists

    const localSettings = await getLocalSettings();

    if (localSettings) {
      if (
        localSettings.config
        && (localSettings.config.version.config && localSettings.config.version.config === config.dataVersion)
      ) {
        // Storage found, hydrate from OS
        commit('replaceStore', localSettings);
      } else {
        // No storage found or data-version has changed. Set with default state
        storage.set(config.localDataFile, config.defaultState);

        // Commit Settings Save
        commit('saveSettings', {
          configLocation: storage.getDataPath(),
          appVersion: config.appVersion,
        });
      }

      // Subscribe to any future state updates and persist the settings
      this.subscribe((mutation, newState) => {
        storage.set(config.localDataFile, newState);
      });
    }
  }, // END: initializeStore()


  /**
 * Action: Clear and Re-Initialize Store from Client
 * ------------------------------------------------------------
 * This mutation is executed on demand and will delete any existing configuration stored on clients local
 * operating system and re-create using defaultState object.
 */
  clearAndReinitializeStore({ commit }) {
    // Remove `parley-data` file, if exists
    storage.remove(config.localDataFile);

    // Create new `parley-data` file with default state object
    storage.set(config.localDataFile, config.defaultState);

    // Hydrate current state with default state object
    commit('replaceStore', config.defaultState);
  }, // END: clearAndReinializeStore()


};
