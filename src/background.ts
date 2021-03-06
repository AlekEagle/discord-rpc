'use strict';
import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  crashReporter
} from 'electron';
import * as Sentry from '@sentry/electron';
import { sentryAuthToken } from '../secrets.json';

Sentry.init({
  dsn: `https://${sentryAuthToken}@o238460.ingest.sentry.io/1416510`
});
crashReporter.start({
  companyName: 'alek-evans',
  productName: 'discord-rpc',
  ignoreSystemCrashHandler: true,
  submitURL: `https://o238460.ingest.sentry.io/api/1416510/minidump/?sentry_key=${sentryAuthToken}`,
  compress: true
});
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { Settings } from './electron/settings';
import AutoLaunch from 'auto-launch';
const autoLaunch = new AutoLaunch({ name: 'Discord RPC' });
const isDevelopment = process.env.NODE_ENV !== 'production';
let mainWindow: BrowserWindow | undefined,
  presenceWindow: BrowserWindow | undefined;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);
class AppSettings extends Settings {}
const settings = new AppSettings();
if (!settings.has('autostart')) settings.set('autostart', true);
(async function() {
  if (settings.get('autostart') && !(await autoLaunch.isEnabled()))
    autoLaunch.enable();
  else if (!settings.get('autostart') && (await autoLaunch.isEnabled()))
    autoLaunch.disable();
})();
if (!settings.has('showonstart')) settings.set('showonstart', false);

async function createWindow() {
  if (!mainWindow) {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      backgroundColor: '#252525',
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
        enableRemoteModule: true,
        contextIsolation: false
      }
    });

    mainWindow.on('close', () => {
      mainWindow = undefined;
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
      if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
    } else {
      createProtocol('app');
      // Load the index.html when not in development
      mainWindow.loadURL('app://./index.html');
    }
  } else {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
}

async function createPresenceWindow() {
  // Create the browser window.
  if (presenceWindow) return;
  presenceWindow = new BrowserWindow({
    width: 640,
    height: 480,
    frame: false,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      enableRemoteModule: true,
      contextIsolation: false
    },
    show: false
  });

  presenceWindow.on('close', () => {
    presenceWindow = undefined;
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await presenceWindow.loadURL(
      `${process.env.WEBPACK_DEV_SERVER_URL}#/presence-handler`
    );
    if (!process.env.IS_TEST) presenceWindow.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    presenceWindow.loadURL('app://./index.html#/presence-handler');
  }
}

ipcMain.on('ctx-mnu', event => {
  let rCMenu = new Menu();
  rCMenu.append(
    new MenuItem({
      label: 'Settings',
      click: () => {
        event.sender.send('ctx-mnu-itm', 'settings-menu');
      }
    })
  );
  rCMenu.append(
    new MenuItem({
      label: 'Help!',
      click: () => {
        event.sender.send('ctx-mnu-itm', 'help');
      }
    })
  );
  rCMenu.append(
    new MenuItem({
      type: 'separator'
    })
  );
  rCMenu.append(
    new MenuItem({
      label: 'Sneaky menu for sneaky people (sneaker!!)',
      click: () => {
        event.sender.send('ctx-mnu-itm', 'sneaky-menu');
      }
    })
  );
  rCMenu.append(
    new MenuItem({
      label: 'Sneaky menu part 2!?!?!? (super sneaker!!!!!)',
      click: () => {
        (presenceWindow as BrowserWindow).webContents.openDevTools();
      }
    })
  );
  rCMenu.popup({
    window: BrowserWindow.fromWebContents(event.sender) as BrowserWindow
  });
});

ipcMain.on('getSettings', e => {
  e.sender.send('getSettings', settings.toJSON());
});

ipcMain.on('setSettings', (e, key, value) => {
  settings.set(key, value);
  e.sender.send('setSettings', settings.toJSON());
  (async function() {
    if (key === 'autostart') {
      if (settings.get('autostart') && !(await autoLaunch.isEnabled()))
        autoLaunch.enable();
      else if (!settings.get('autostart') && (await autoLaunch.isEnabled()))
        autoLaunch.disable();
    }
  })();
});

ipcMain.on('handshake', (e, handshake: string) => {
  switch (handshake) {
    case 'main':
      e.sender.send(
        'handshake',
        mainWindow !== undefined ? mainWindow.id : null
      );
      break;
    case 'presence':
      e.sender.send(
        'handshake',
        presenceWindow !== undefined ? presenceWindow.id : null
      );
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    createWindow();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  import('./electron/tray');
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createPresenceWindow();
  if (settings.get('showonstart')) createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

export default {
  createWindow,
  createPresenceWindow,
  mainWindow,
  presenceWindow
};
