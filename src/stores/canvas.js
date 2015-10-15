import {EventEmitter} from 'events';
import _assign from 'object-assign';
import eventConstants from '../constants/events';
import appDispatcher from '../dispatcher/app-dispatcher';

var _width = 300;
var _height = 300;

var canvasStore = _assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getWidth() {
    return _width;
  },

  getHeight() {
    return _height;
  }
});

appDispatcher.register(payload => {
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
    case eventConstants.RESET:
      _width = 300;
      _height = 300;
      break;
    default:
      return true;
  }
});

export default canvasStore;
