var events = require('events');
var _assign = require('object-assign');
var eventConstants = require('../constants/events');
var appDispatcher = require('../dispatcher/app-dispatcher');

var _animations = [];
var _selectedAnimation = null;

var animationStore = _assign({}, events.prototype, {
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
    case eventConstants.ADD_ANIMATION:
      var animation = action.data ? action.data : 'Untitled ' + _animations.length;
      _animations.push(animation);
      _selectedAnimation = animation;
      animationStore.emit(eventConstants.CHANGE);
      break;
    case eventConstants.SELECT_ANIMATION:
      _selectedAnimation = action.data;
      animationStore.emit(eventConstants.CHANGE);
      break;
    default:
      return true;
  }
});

module.exports = animationStore;
