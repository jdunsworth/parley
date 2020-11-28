import {
  app, BrowserWindow, nativeTheme, shell,
} from 'electron';

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
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    center: true,
    backgroundColor: '#222',
    title: 'Parley for Canvas',
    darkTheme: true,
    useContentSize: true,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,
      enableRemoteModule: true, // Electron-Settings Support
    },
  });

  // Load the initial page on load
  mainWindow.loadURL(process.env.APP_URL);

  // Open external links in new browser window instead of another Electron window
  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  // Close main window
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
