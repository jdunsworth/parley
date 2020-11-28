import Vue from 'vue';
import Vuex from 'vuex';
import storage from 'electron-json-storage';

const packageJSON = require('../../package.json');

/**
 * Default State Object
 * !! If you change the structure, also increment the parley.dataVersion so that it attaches the new structure
 * !! Be careful though since it will require a complete re-setup of students. Issue #1
 */
const defaultState = {
  config: {
    version: {
      app: packageJSON.version,
      config: packageJSON.parley['data-version'],
    },
    location: storage.getDataPath(),
    organization: 'dale',
  },
  profiles: [],
  preferences: {},
};

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({

    state: defaultState,

    mutations: {

      /**
       * Initialize the store by hydrating state from local OS
       * ------------------------------------------------------------
       */
      initializeStore() {
        // Get `parley-data` file and contents, if exists
        const currentStorage = storage.get('parley-data', (error, data) => data || undefined);

        if (
          currentStorage
          && (currentStorage.version && currentStorage.version === packageJSON.parley['data-version'])
        ) {
          this.replaceState(currentStorage); // Storage found, hydrate from OS
        } else {
          // No storage found or data-version has changed. Set with default state
          storage.set('parley-data', defaultState);

          this.state.config.location = storage.getDataPath();
          this.state.config.version.app = packageJSON.version;

          /**
           * TODO: Need to make this smarter about data structure changes between data versions - Issue #1
           */
        }

        // Subscribe to any future state updates and persist the settings
        this.subscribe((state) => {
          storage.set('parley-data', state);
        });
      }, // End: initializeStore()

      /**
       * Clear and Reinitialize Store with Default State
       * ------------------------------------------------------------
       */
      clearAndReinitializeStore() {
        // Remove `parley-data` file, if exists
        storage.remove('parley-data');

        // Create new `parley-data` file with default state object
        storage.set('parley-data', defaultState);

        // Hydrate current state with default state object
        this.replaceState(defaultState);
      }, // End: clearAndReinializeStore()

    },

  });

  return Store;
}
