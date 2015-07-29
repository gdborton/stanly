import {EventEmitter} from 'events';
import _assign from 'object-assign';
import eventConstants from '../constants/events';
import appDispatcher from '../dispatcher/app-dispatcher';

var _changeCallback = null;
var _originalValue = '';
var _open = false;

var renameModalStore = _assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getIsOpen() {
    return _open;
  },

  getChangeCallback() {
    return _changeCallback;
  },

  getOriginalValue() {
    return _originalValue;
  }
});

var change = function() {
  renameModalStore.emit(eventConstants.CHANGE);
};

appDispatcher.register(payload => {
  var action = payload.action;

  switch (action.actionType) {
    case eventConstants.OPEN_RENAME_MODAL:
      _open = true;
      _originalValue = action.data.originalValue;
      _changeCallback = action.data.onChange;
      change();
      break;
    case eventConstants.CLOSE_RENAME_MODAL:
      _open = false;
      _changeCallback = null;
      change();
    default:
      return true;
  }
});

export default renameModalStore;
