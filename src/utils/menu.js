const remote = require('remote');
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');

const app = remote.require('app');
const reduxStore = require('../stores/redux');
const thunks = require('../actions/thunks');

var template = [{
  label: 'File',
  submenu: [
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click: () => {
        reduxStore.dispatch(thunks.saveState());
      }
    },
    {
      label: 'Exit',
      click: app.quit
    }
  ]
}];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
