import editorStore from '../stores/editor';
import debounce from 'debounce';

import fileActions from '../actions/files';
import canvasActions from '../actions/canvas';
import animationActions from '../actions/animations';
import frameActions from '../actions/frames';
import fs from 'fs';

var exportableStores = [editorStore];
var exportName = 'spriteconfig.js';

var exportHandler = {
  buildExportObject() {
    return editorStore.getExportObject();
  },

  attemptExport: debounce(() => {
    var exportObject = exportHandler.buildExportObject();
    fs.writeFile(exportName, 'module.exports = ' + JSON.stringify(exportObject, null, 2));
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
          canvasActions.setWidth(importedData.width);
          canvasActions.setHeight(importedData.height);
          importedData.files.forEach(file => {
            fileActions.addFile(file);
          });

          Object.keys(importedData.animations).forEach(animationName => {
            animationActions.addAnimation(animationName);
            var frames = importedData.animations[animationName];
            frames.forEach(frame => {
              frameActions.addFrame();
              if (frame.duration) {
                frameActions.setDuration(frame.duration);
              }

              Object.keys(frame.files).forEach(fileIndex => {
                var fileName = importedData.files[parseInt(fileIndex)];
                var fileSettings = frame.files[fileIndex];
                fileActions.selectFileByName(fileName);
                frameActions.setRotation(fileSettings.rotation);
                frameActions.setTop(fileSettings.top);
                frameActions.setLeft(fileSettings.left);
                frameActions.setVisible(fileSettings.visible);
              });

            });
          });

        } else {
          animationActions.addAnimation('Base');
        }

        filesThatNeedAdded.forEach(file => {
          fileActions.addFile(file);
        });
      });
    });
  }
};

exportableStores.forEach((store) => {
  store.addChangeListener(exportHandler.attemptExport);
});

export default exportHandler;
