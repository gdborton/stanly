var appDispatcher = require('../dispatcher/app-dispatcher');
var events = require('../constants/events');

var frameActions = {
  addFrame: function() {
    appDispatcher.handleAction({
      actionType: events.ADD_FRAME,
      data: null
    });
  },

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

  rotateLeft: function() {
    appDispatcher.handleAction({
      actionType: events.ROTATE_LEFT_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  rotateRight: function() {
    appDispatcher.handleAction({
      actionType: events.ROTATE_RIGHT_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  selectFrame: function(frame) {
    appDispatcher.handleAction({
      actionType: events.SELECT_FRAME,
      data: frame
    });
  },

  setRotation: function(rotation) {
    appDispatcher.handleAction({
      actionType: events.SET_ROTATION_FOR_SELECTED_FILE_FRAME,
      data: rotation
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
  },

  toggleFileVisibity: function() {
    appDispatcher.handleAction({
      actionType: events.TOGGLE_VISIBILITY_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  }
};

module.exports = frameActions;
