import {EventEmitter} from 'events';
import _assign from 'object-assign';
import eventConstants from '../constants/events';
import appDispatcher from '../dispatcher/app-dispatcher';

var _open = false;
var _contextMenuItems = [];
var _top = -1;
var _left = -1;

var contextMenuStore = _assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getContextMenuItems() {
    return _contextMenuItems;
  },

  getIsOpen() {
    return _open;
  },

  getTop() {
    return _top;
  },

  getLeft() {
    return _left;
  }
});

var change = function() {
  contextMenuStore.emit(eventConstants.CHANGE);
};

appDispatcher.register(payload => {
  var action = payload.action;
  switch (action.actionType) {
    case eventConstants.CLOSE_CONTEXT_MENU:
      _open = false;
      _contextMenuItems = [];
      change();
      break;
    case eventConstants.OPEN_CONTEXT_MENU:
      _open = true;
      _contextMenuItems = action.data.contextMenuOptions;
      if (action.data.eventData && action.data.eventData.pageX) {
        _left = action.data.eventData.pageX;
        _top = action.data.eventData.pageY;
      }
      change();
      break;
    case eventConstants.RESET:
      _open = false;
      _contextMenuItems = [];
      _top = -1;
      _left = -1;
      break;
    default:
      return true;
  }
});

export default contextMenuStore;
