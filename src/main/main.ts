/* eslint global-require: off, no-console: off, promise/always-return: off */
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import axios from 'axios';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import Parser from 'rss-parser';
import { resolveHtmlPath } from './util';

const puppeteer = require('puppeteer-core');
const { executablePath } = require('puppeteer');

const proxyPage = 'https://www.genmirror.com/';

const parser = new Parser();

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

const findRssInString = (str: string) => {
  const start = str.toString().indexOf('<rss');
  const end = str.toString().indexOf('</rss>') + 6;
  const slice = str.slice(start, end).trim();
  return slice;
};

const getDataFromWebproxy = async (
  src: string,
  onPageLoadedDataSelector: string
) => {
  const proxy = 'https://www.croxyproxy.com/';
  const browser = await puppeteer.launch({
    // headless: true,
    // args: ["--proxy-server=89.221.203.159:63928"],
    headless: true,
    executablePath: executablePath(),
  });
  const page = await browser.newPage();
  await page.goto(proxy, { timeout: 0, waitUntil: 'domcontentloaded' });

  const input = 'input[id="url"]';
  const button = 'button[id="requestSubmit"]';
  await page.waitForSelector(input);
  await page.waitForSelector(button);
  await page.type(input, src);
  await page.click(button);

  await page.waitForSelector(onPageLoadedDataSelector);

  const html = await page.evaluate(
    () => document.querySelector('*')!.outerHTML
  );
  browser.close();
  return html;
};

const parseRSSFromURL = async (src: string) => {
  let feed;
  try {
    feed = await parser.parseURL(src);
    return feed;
  } catch (error) {
    console.log(error);
  }
  return feed;
};

const parseRSSFromString = async (src: string) => {
  let feed;
  try {
    const htmlSlice = await getDataFromWebproxy(src, 'div.folder');
    const rssFromHtml = findRssInString(htmlSlice);
    feed = await parser.parseString(rssFromHtml);
    console.log(feed.link);
    return feed;
  } catch (error) {
    console.log(error);
  }
  return feed;
};

ipcMain.handle('get-news', async (event, searchQuery) => {
  const result = await parseRSSFromURL(searchQuery);
  return result;
  // let result;
  // try {
  //   result = await parseRSSFromURL(searchQuery);
  // } catch (error) {
  //   result = await parseRSSFromString(searchQuery);
  // }
  // return result;
});

ipcMain.handle('get-proxy-news', async (event, searchQuery) => {
  const result = await parseRSSFromString(searchQuery);
  return result;
});

ipcMain.handle('export-settings', async (event, settings) => {
  dialog
    .showSaveDialog({
      title: 'Select the file path to save settings',
      defaultPath: path.join(__dirname, '../assets/settings.json'),
      buttonLabel: 'Save',
      filters: [
        {
          name: 'Text Files',
          extensions: ['json'],
        },
      ],
      properties: [],
    })
    .then((file) => {
      if (!file.canceled && file.filePath) {
        fs.writeFile(file.filePath.toString(), settings, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.handle('import-settings', async (event) => {
  const jsonSettings = await dialog
    .showOpenDialog({
      title: 'Select the file to import settings',
      defaultPath: path.join(__dirname, '../assets/settings.json'),
      buttonLabel: 'Open',
      filters: [
        {
          name: 'Text Files',
          extensions: ['json'],
        },
      ],
      properties: ['openFile'],
    })
    .then((response) => {
      if (response.canceled) {
        console.log('no file selected');
      }
      const content = fs.readFileSync(response.filePaths[0]).toString();
      return content;
    })
    .catch((err) => {
      console.log(err);
    });
  return jsonSettings;
});

ipcMain.handle('get-details', async (event, searchQuery) => {
  let result;
  try {
    result = await axios(searchQuery)
      .then((response) => {
        return response.data;
      })
      .catch(console.log);
    return result;
  } catch (error) {
    console.log(error);
  }
  return result;
});

ipcMain.handle('get-proxy-details', async (event, searchQuery) => {
  let result;
  try {
    const htmlFromProxy = await getDataFromWebproxy(searchQuery, 'p');
    console.log(htmlFromProxy);

    result = await axios(searchQuery)
      .then((response) => {
        return response.data;
      })
      .catch(console.log);
    return result;
  } catch (error) {
    console.log(error);
  }
  return result;
});

// const options = {
//   silent: false,
//   printBackground: true,
//   color: false,
//   // margin: {
//   //   marginType: 'printableArea',
//   // },
//   landscape: false,
//   // pagesPerSheet: 1,
//   collate: false,
//   copies: 1,
//   pageSize: 'A4',
// };

// ipcMain.on('print-news', async (event, htmlString) => {
//   dialog
//     .showSaveDialog({
//       title: 'Select the File Path to save',
//       defaultPath: path.join(__dirname, '../assets/sample.doc'),
//       buttonLabel: 'Save',
//       filters: [
//         {
//           name: 'Text Files',
//           extensions: ['txt', 'doc'],
//         },
//       ],
//       properties: [],
//     })
//     .then((file) => {
//       if (!file.canceled && file.filePath) {
//         fs.writeFile(
//           file.filePath.toString(),
//           htmlString[0],
//           function (err: Error) {
//             if (err) throw err;
//             console.log('Saved!');
//           }
//         );
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   // const win = BrowserWindow.getFocusedWindow();
//   // if (!mainWindow) return;
//   // mainWindow.webContents.print(options, (success, failureReason) => {
//   //   if (!success) console.log(failureReason);
//   //   console.log('Print Initiated');
//   // });
//   console.log('inside main handler');
// });

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.maximize();

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  mainWindow.webContents.openDevTools();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  })
  .catch(console.log);
