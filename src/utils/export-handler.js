var frameStore = require('../stores/frames');
var fileStore = require('../stores/files');
var canvasStore = require('../stores/canvas');
var animationStore = require('../stores/animations');
var debounce = require('debounce');

var fileActions = require('../actions/files');
var canvasActions = require('../actions/canvas');
var animationActions = require('../actions/animations');
var frameActions = require('../actions/frames');

var exportableStores = [frameStore, fileStore, canvasStore, animationStore];
var fs = require('fs');
var exportName = 'spriteconfig.js';

var exportHandler = {
  attemptExport: debounce(function() {
    var exportObject = {
      width: canvasStore.getWidth(),
      height: canvasStore.getHeight(),
      files: fileStore.getFiles().map(file => {
        return file.name;
      }),

      animations: {}
    };

    animationStore.getAnimations().forEach(function(animation) {
      var animationFrames = frameStore.getFrames().filter(function(frame) {
        return frame.animation === animation;
      });

      exportObject.animations[animation] = animationFrames.map(animation => {
        var returnObj = {
          duration: animation.duration,
          files: {}
        };

        Object.keys(animation.files).forEach(filePath => {
          var animationFileFrame = animation.files[filePath];
          if (animationFileFrame.visible) {
            var fileIndex = exportObject.files.indexOf(exportObject.files.filter(file => {
              return file === filePath.split('/').pop();
            })[0]);

            returnObj.files[fileIndex] = {
              top: animationFileFrame.top,
              left: animationFileFrame.left,
              rotation: animationFileFrame.rotation
            };
          }
        });

        return returnObj;
      });
    });

    fs.writeFile(exportName, 'module.exports = ' + JSON.stringify(exportObject, null, 2));
  }, 3000),

  attemptImport: function(data) {
    var filesThatNeedAdded = [];
    fs.readdir(process.cwd(), function(err, files) {
      if (!err) {
        filesThatNeedAdded = files.filter(file => {
          return /.*\.(png|jpg|jpeg|bmp)/.test(file);
        });
      }

      fs.readFile(exportName, function(err, data) {
        if (!err) {
          var importedData = require(process.cwd() + '/' + exportName);
          canvasActions.setWidth(importedData.width);
          canvasActions.setHeight(importedData.height);
          importedData.files.forEach(file => {
            fileActions.addFile(file, process.cwd() + '/' + file);
          });

          Object.keys(importedData.animations).forEach(animationName => {
            animationActions.addAnimation(animationName);
            var frames = importedData.animations[animationName];
            frames.forEach(frame => {
              frameActions.addFrame();
              if (frame.duration) {
                frameActions.setDuration(frame.duration);
              }
            });
          });

        } else {
          animationActions.addAnimation('Base');
        }

        filesThatNeedAdded.forEach(file => {
          fileActions.addFile(file, process.cwd() + '/' + file);
        });
      });
    });
  }
};

exportableStores.forEach(function(store) {
  store.addChangeListener(exportHandler.attemptExport);
});

module.exports = exportHandler;
