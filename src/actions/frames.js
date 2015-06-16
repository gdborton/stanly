var appDispatcher = require('../dispatcher/app-dispatcher');
var events = require('../constants/events');

var frameActions = {
  setTop: function(top) {
    appDispatcher.handleAction({
      actionType: events.SET_TOP_FOR_SELECTED_FILE_FRAME,
      data: top
    });
  },
  setLeft: function(left) {
    appDispatcher.handleAction({
      actionType: events.SET_LEFT_FOR_SELECTED_FILE_FRAME,
      data: left
    });
  }
};

module.exports = frameActions;
