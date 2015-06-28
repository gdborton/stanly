var appDispatcher = require('../dispatcher/app-dispatcher');
var events = require('../constants/events');

var frameActions = {
  decrementLeft: function() {
    appDispatcher.handleAction({
      actionType: events.DECREMENT_LEFT_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  decrementTop: function() {
    appDispatcher.handleAction({
      actionType: events.DECREMENT_TOP_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  incrementLeft: function() {
    appDispatcher.handleAction({
      actionType: events.INCREMENT_Left_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  incrementTop: function() {
    appDispatcher.handleAction({
      actionType: events.INCREMENT_TOP_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

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
