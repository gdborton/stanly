var events = require('events');
var _assign = require('object-assign');
var eventConstants = require('../constants/events');
var appDispatcher = require('../dispatcher/app-dispatcher');

var _width = 300;
var _height = 300;

var canvasStore = _assign({}, events.prototype, {
  addChangeListener: function(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener: function() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getWidth: function() {
    return _width;
  },

  getHeight: function() {
    return _height;
  }
});

appDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.actionType) {
    case eventConstants.SET_CANVAS_WIDTH:
      _width = action.data;
      canvasStore.emit(eventConstants.CHANGE);
      break;
    case eventConstants.SET_CANVAS_HEIGHT:
      _height = action.data;
      canvasStore.emit(eventConstants.CHANGE);
      break;
    default:
      return true;
  }
});

module.exports = canvasStore;
