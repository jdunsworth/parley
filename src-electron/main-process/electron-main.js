import { app, BrowserWindow, nativeTheme } from 'electron';
import fs from 'fs';

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'));
  }
} catch (_) {
  //
}

/**
   * Set `__statics` path to static files in production;
   * The reason we are setting it here is that the path needs to be evaluated at runtime
   */
if (process.env.PROD) {
  global.__statics = __dirname;
}

let mainWindow;

function createWindow() {
  /**
     * Initial window options
     */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#222',
    title: 'Parley for Canvas',
    darkTheme: true,
    useContentSize: true,
    autoHideMenuBar: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    },
  });

  // Get User Configuration Directory
  const configPath = `${app.getPath('userData')}\\parley-config.json`;

  // Set our initial route to load with the selector
  // eslint-disable-next-line no-unused-vars
  let routeToLoad = process.env.APP_URL;

  // Check if configuration file exists
  if (fs.existsSync(configPath)) {
    // Load configuration file
    try {
      const loadedConfigFile = fs.readFileSync(configPath, 'utf-8');
      const configFileData = JSON.parse(loadedConfigFile);

      if (configFileData.url) {
        routeToLoad = `${process.env.APP_URL}#${configFileData.url}`;
      }
    } catch (err) {
      console.log('Unable to load configuration file. Falling back to selector...');
    }
  }

  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
