/**
 * ============================================================
 * Parley Vuex Mutations
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
   */
  initializeStore() {
    // Get `parley-data` file and contents, if exists
    const currentStorage = storage.get('parley-data', (error, data) => data || undefined);

    if (
      currentStorage
      && (currentStorage.version && currentStorage.version === config.dataVersion)
    ) {
      // Storage found, hydrate from OS
      this.replaceState(currentStorage);
    } else {
      // No storage found or data-version has changed. Set with default state
      storage.set('parley-data', config.defaultState);

      this.state.config.location = storage.getDataPath();
      this.state.config.version.app = config.appVersion;

      /**
       * TODO: Need to make this smarter about data structure changes between data versions - Issue #1
       */
    }

    // Subscribe to any future state updates and persist the settings
    this.subscribe((mutation, state) => {
      storage.set('parley-data', state);
    });
  }, // END: initializeStore()


  /**
   * Mutation: Clear and Re-Initialize Store from Client
   * ------------------------------------------------------------
   * This mutation is executed on demand and will delete any existing configuration stored on clients local
   * operating system and re-create using defaultState object.
   */
  clearAndReinitializeStore() {
    // Remove `parley-data` file, if exists
    storage.remove('parley-data');

    // Create new `parley-data` file with default state object
    storage.set('parley-data', config.defaultState);

    // Hydrate current state with default state object
    this.replaceState(config.defaultState);
  }, // END: clearAndReinializeStore()

};
