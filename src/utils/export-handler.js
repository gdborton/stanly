var frameStore = require('../stores/frames');
var fileStore = require('../stores/files');
var canvasStore = require('../stores/canvas');
var animationStore = require('../stores/animations');

var exportableStores = [frameStore, fileStore, canvasStore, animationStore];

var exportObj = {
  width: 1,
  height: 1,
  animations: {
    idle:
      [
        {
        duration: 1,
        files: {
          'hand.png': {
            top: 1,
            left: 1,
            visible: true
          }
        }
      },
      {}
    ]
  }
};

var fs = require('fs');

var exportHandler = {
  attemptExport: function() {
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
          duration: animation.duraction,
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

    fs.writeFile('test.js', 'module.exports = ' + JSON.stringify(exportObject, null, 2));
    console.log(Object.keys(fs));
  },

  attemptImport: function(data) {

  }
};

exportableStores.forEach(function(store) {
  store.addChangeListener(exportHandler.attemptExport);
});

module.exports = exportHandler;
