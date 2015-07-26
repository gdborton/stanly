var appDispatcher = require('../dispatcher/app-dispatcher');
var events = require('../constants/events');

var fileActions = {
  addFile: function(fileName, filePath) {
    appDispatcher.handleAction({
      actionType: events.ADD_FILE,
      data: {
        name: fileName,
        path: filePath
      }
    });
  },

  renameFile: function(file, newName) {
    appDispatcher.handleAction({
      actionType: events.RENAME_FILE,
      data: {
        file: file,
        newName: newName,
        oldPath: file.path
      }
    });
  },

  selectFile: function(file) {
    appDispatcher.handleAction({
      actionType: events.SELECT_FILE,
      data: file
    });
  },

  selectFileByName: function(fileName) {
    appDispatcher.handleAction({
      actionType: events.SELECT_FILE_BY_NAME,
      data: fileName
    });
  },

  moveSelectedFileUp: function() {
    appDispatcher.handleAction({
      actionType: events.MOVE_SELECTED_FILE_UP,
      data: null
    });
  },

  moveSelectedFileDown: function() {
    appDispatcher.handleAction({
      actionType: events.MOVE_SELECTED_FILE_DOWN,
      data: null
    });
  }
};

module.exports = fileActions;
