var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 800});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/src/index.html');
  //mainWindow.loadUrl('http://localhost:3001');

  // Open the devtools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

var WPDS = require('webpack-dev-server');
var config = require('./webpack.config');
var webpack = require('webpack');
var port = process.env.PORT || 3001;
var address = process.env.C9_USER ? 'http://' + process.env.C9_PROJECT + '-' + process.env.C9_USER + '.c9.io' : 'http://localhost';
new WPDS(webpack(config), {
  hot: true,
  contentBase: './src'
}).listen(port, function(err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + address + ':' + port);
});
