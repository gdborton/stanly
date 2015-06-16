var appDispatcher = require('../dispatcher/app-dispatcher');
var events = require('../constants/events');

var canvasActions = {
  setHeight: function(height) {
    appDispatcher.handleAction({
      actionType: events.SET_CANVAS_HEIGHT,
      data: height
    });
  },

  setWidth: function(width) {
    appDispatcher.handleAction({
      actionType: events.SET_CANVAS_WIDTH,
      data: width
    });
  }
};

module.exports = canvasActions;
