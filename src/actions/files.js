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

  selectFile: function(file) {
    appDispatcher.handleAction({
      actionType: events.SELECT_FILE,
      data: file
    });
  }
};

module.exports = fileActions;
