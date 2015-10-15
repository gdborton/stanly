var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var exportHandler = require('./export-handler');
var app = remote.require('app');

var template = [{
  label: 'File',
  submenu: [
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click: exportHandler.attemptExport
    },
    {
      label: 'Exit',
      click: app.quit
    }
  ]
}];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
