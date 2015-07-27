import events from 'events';
import _assign from 'object-assign';
import eventConstants from '../constants/events';
import appDispatcher from '../dispatcher/app-dispatcher';

var _animations = [];
var _selectedAnimation = null;

var animationStore = _assign({}, events.prototype, {
  addChangeListener(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getAnimations() {
    return _animations;
  },

  getSelectedAnimation() {
    return _selectedAnimation;
  }
});

animationStore.dispatchToken = appDispatcher.register((payload) => {
  var action = payload.action;
  switch (action.actionType) {
    case eventConstants.ADD_ANIMATION:
      var animation = action.data ? action.data : 'Untitled ' + _animations.length;
      _animations.push(animation);
      _selectedAnimation = animation;
      animationStore.emit(eventConstants.CHANGE);
      break;
    case eventConstants.RENAME_ANIMATION:
      var animationIndex = _animations.indexOf(action.data.oldName);
      _animations[animationIndex] = action.data.newName;
      if (_selectedAnimation = action.data.oldName) {
        _selectedAnimation = action.data.newName;
      }
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

export default animationStore;
