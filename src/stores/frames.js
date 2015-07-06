var events = require('events');
var _assign = require('object-assign');
var eventConstants = require('../constants/events');
var appDispatcher = require('../dispatcher/app-dispatcher');
var fileStore = require('./files');
var animationStore = require('./animations');

var _frames = [];
var _selectedFrame = null;
var _isPlaying = false;
var _frameTimer = false;

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

  getFramesForSelectedAnimation: function() {
    return _frames.filter(function(frame) {
      return frame.animation === animationStore.getSelectedAnimation();
    });
  },

  getSelectedFrame: function() {
    return _selectedFrame;
  },

  getIsPlaying: function() {
    return _isPlaying;
  }
});

var change = function() {
  frameStore.emit(eventConstants.CHANGE);
};

var handleAddFile = function(file) {
  if (!_frames.length) {
    _frames.push({
      duration: 500,
      files: {},
      animation: animationStore.getSelectedAnimation()
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

var handleAddFrame = function() {
  var newFrame = {
    duration: 500,
    files: {},
    animation: animationStore.getSelectedAnimation()
  };
  var lastFrame = _frames[_frames.length - 1];
  fileStore.getFiles().forEach(function(file) {
    var lastFileFrame = lastFrame.files[file.path];
    newFrame.files[file.path] = {
      top: lastFileFrame.top,
      left: lastFileFrame.left,
      rotation: lastFileFrame.rotation,
      visible: lastFileFrame.visible,
      filepath: file.path
    }
  });
  _frames.push(newFrame);
  _selectedFrame = _frames[_frames.length - 1];
};

var togglePlaying = function() {
  _isPlaying = !_isPlaying;
  if (_isPlaying) {
    setupTimer();
  } else {
    clearInterval(_frameTimer);
  }
};

var setupTimer = function() {
  var frames = frameStore.getFramesForSelectedAnimation();

  _frameTimer = setTimeout(function() {
    var selectedFrameIndex = frames.indexOf(_selectedFrame);
    if (selectedFrameIndex === frames.length - 1) {
      _selectedFrame = frames[0];
    } else {
      _selectedFrame = frames[selectedFrameIndex + 1];
    }
    change();
    setupTimer();
  }, _selectedFrame.duration);
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
    case eventConstants.ADD_FRAME:
      handleAddFrame();
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
    case eventConstants.SET_DURATION_FOR_SELECTED_FRAME:
      _selectedFrame.duration = action.data;
      change();
      break;
    case eventConstants.TOGGLE_VISIBILITY_FOR_SELECTED_FILE_FRAME:
      fileFrame.visible = !fileFrame.visible;
      change();
      break;
    case eventConstants.TOGGLE_PLAYING:
      togglePlaying();
      change();
      break;
    case eventConstants.SELECT_ANIMATION:
      _selectedFrame = frameStore.getFramesForSelectedAnimation()[0];
      change();
      break;
    default:
      return true;
  }
});

module.exports = frameStore;
