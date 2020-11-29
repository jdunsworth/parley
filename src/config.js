/**
 * ============================================================
 * Parley Configuration
 * ============================================================
 */

// Imports
import storage from 'electron-json-storage';
import packageJSON from '../package.json';

export default {

  appVersion: packageJSON.version, // Application Version
  dataVersion: packageJSON.parley['data-version'], // Configuration (this) file version

  /**
  * Default State Object
  * !! If you change the structure, also increment the parley.dataVersion so that it attaches the new structure
  * !! Be careful though since it will require a complete re-setup of students. Issue #1
  */
  defaultState: {
    config: {
      version: {
        app: packageJSON.version, // Application Version
        config: packageJSON.parley['data-version'], // Configuration (this) file version
      },
      location: storage.getDataPath(), // Location where configuration (this) is/will be stored on clients local system
      organization: null, // Canvas organization subdomain
      environment: 'production', // Canvas target environment
      firstRun: true, // Triggers settings on load if true
    },
    profiles: [],
    preferences: {},
  },


};
