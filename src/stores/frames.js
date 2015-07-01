var events = require('events');
var _assign = require('object-assign');
var eventConstants = require('../constants/events');
var appDispatcher = require('../dispatcher/app-dispatcher');
var fileStore = require('./files');

var _frames = [];
var _selectedFrame = null;

var frameStore = _assign({}, events.prototype, {
  addChangeListener: function(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener: function() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getFrames: function() {
    return _frames;
  },

  getSelectedFrame: function() {
    return _selectedFrame;
  }
});

var change = function() {
  frameStore.emit(eventConstants.CHANGE);
};

var handleAddFile = function(file) {
  if (!_frames.length) {
    _frames.push({
      duration: 500,
      files: {}
    });
    _selectedFrame = _frames[0];
  }

  _frames.forEach(function(frame) {
    frame.files[file.path] = {
      top: 0,
      left: 0,
      rotation: 0,
      visible: true,
      filepath: file.path
    }
  });
};

appDispatcher.register(function(payload) {
  var action = payload.action;
  if (_selectedFrame && _selectedFrame.files && fileStore.getSelectedFile()) {
    var fileFrame = _selectedFrame.files[fileStore.getSelectedFile().path];
  }

  switch (action.actionType) {
    case eventConstants.ADD_FILE:
      handleAddFile(action.data);
      change();
      break;
    case eventConstants.SELECT_FRAME:
      _selectedFrame = action.data;
      change();
      break;
    case eventConstants.SET_LEFT_FOR_SELECTED_FILE_FRAME:
      fileFrame.left = parseInt(action.data) || 0;
      change();
      break;
    case eventConstants.SET_ROTATION_FOR_SELECTED_FILE_FRAME:
      fileFrame.rotation = parseInt(action.data) || 0;
      change();
      break;
    case eventConstants.SET_TOP_FOR_SELECTED_FILE_FRAME:
      fileFrame.top = parseInt(action.data) || 0;
      change();
      break;
    case eventConstants.DECREMENT_TOP_FOR_SELECTED_FILE_FRAME:
      fileFrame.top--;
      change();
      break;
    case eventConstants.INCREMENT_TOP_FOR_SELECTED_FILE_FRAME:
      fileFrame.top++;
      change();
      break;
    case eventConstants.DECREMENT_LEFT_FOR_SELECTED_FILE_FRAME:
      fileFrame.left--;
      change();
      break;
    case eventConstants.INCREMENT_Left_FOR_SELECTED_FILE_FRAME:
      fileFrame.left++;
      change();
      break;
    case eventConstants.ROTATE_LEFT_FOR_SELECTED_FILE_FRAME:
      fileFrame.rotation--;
      change();
      break;
    case eventConstants.ROTATE_RIGHT_FOR_SELECTED_FILE_FRAME:
      fileFrame.rotation++;
      change();
      break;
    case eventConstants.TOGGLE_VISIBILITY_FOR_SELECTED_FILE_FRAME:
      fileFrame.visible = !fileFrame.visible;
      change();
      break;
    default:
      return true;
  }
});

module.exports = frameStore;
