const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow, faqWindow, splashWindow;

function createSplashScreen() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 171,
    frame: false,
    transparent: false,
    alwaysOnTop: true,
    resizable: false,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  splashWindow.loadFile('splash.html');
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

function createFaqWindow() {
  faqWindow = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  faqWindow.loadFile('faq.html');

  setTimeout(() => {
    faqWindow.close();
  }, 4000);
}

const menuTemplate = [
  {
    label: 'Help',
    submenu: [
      {
        label: 'FAQ',
        click: () => {
          createFaqWindow();
        }
      },
      {
        role: 'quit'
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  createSplashScreen();

  setTimeout(() => {
    splashWindow.close();
    createMainWindow();
  }, 5000); // Show splash for 2 seconds
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
