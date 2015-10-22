import editorStore from '../stores/editor';
import debounce from 'debounce';

import fileActions from '../actions/files';
import animationActions from '../actions/animations';
import contextlessActions from '../actions/contextless';
import fs from 'fs';

var exportName = 'spriteconfig.js';

var exportHandler = {
  buildExportObject() {
    return editorStore.getExportObject();
  },

  attemptExport: debounce(() => {
    var exportObject = exportHandler.buildExportObject();
    fs.writeFile(exportName, 'module.exports = ' + JSON.stringify(exportObject, null, 2) + ';');
  }, 3000),

  attemptImport(data) {
    var filesThatNeedAdded = [];
    fs.readdir(process.cwd(), (err, files) => {
      if (!err) {
        filesThatNeedAdded = files.filter(file => {
          return /.*\.(png|jpg|jpeg|bmp)/.test(file);
        });
      }

      fs.readFile(exportName, (err, data) => {
        if (!err) {
          var importedData = require(process.cwd() + '/' + exportName);
          contextlessActions.importState(importedData);
        } else {
          animationActions.addAnimation('Base');
        }

        filesThatNeedAdded.forEach(fileActions.addFile);
      });
    });
  }
};

editorStore.addChangeListener(exportHandler.attemptExport);

export default exportHandler;
