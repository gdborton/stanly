var events = require('events');
var _assign = require('object-assign');
var eventConstants = require('../constants/events');
var appDispatcher = require('../dispatcher/app-dispatcher');

var _animations = ['Base'];
var _selectedAnimation = _animations[0];

var canvasStore = _assign({}, events.prototype, {
  addChangeListener: function(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener: function() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getAnimations: function() {
    return _animations;
  },

  getSelectedAnimation: function() {
    return _selectedAnimation;
  }
});

appDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.actionType) {
    default:
      return true;
  }
});

module.exports = canvasStore;
