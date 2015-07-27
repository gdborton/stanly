import events from 'events';
import _assign from 'object-assign';
import eventConstants from '../constants/events';
import appDispatcher from '../dispatcher/app-dispatcher';
import fileStore from './files';
import animationStore from './animations';

var _frames = [];
var _selectedFrame = null;
var _isPlaying = false;
var _frameTimer = false;

var frameStore = _assign({}, events.prototype, {
  addChangeListener(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getFrames() {
    return _frames;
  },

  getFramesForSelectedAnimation() {
    return _frames.filter(frame => {
      return frame.animation === animationStore.getSelectedAnimation();
    });
  },

  getSelectedFrame() {
    return _selectedFrame;
  },

  getIsPlaying() {
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

  _frames.forEach(frame => {
    if (!frame.files[file.path]) {
      frame.files[file.path] = {
        top: 0,
        left: 0,
        rotation: 0,
        visible: true,
        filepath: file.path
      }
    }
  });
};

var handleAddFrame = function() {
  var newFrame = {
    duration: 500,
    files: {},
    animation: animationStore.getSelectedAnimation()
  };
  var _matchingFrames = _frames.filter(frame => {
    return frame.animation === newFrame.animation;
  });

  var lastFrame = _matchingFrames.length ? _matchingFrames[_matchingFrames.length - 1] : _frames[_frames.length - 1];

  fileStore.getFiles().forEach(file => {
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

var handleFileNameChange = function(oldPath, newName) {
  _frames.forEach(frame => {
    var newPath = oldPath.substring(0, oldPath.lastIndexOf('/') + 1) + newName;
    frame.files[newPath] = frame.files[oldPath];
    delete frame.files[oldPath];
  });

  change();
};

var handleAnimationNameChange = function(oldName, newName) {
  _frames.forEach(frame => {
    if (frame.animation === oldName) {
      frame.animation = newName;
    }
  });
  change();
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

  _frameTimer = setTimeout(() => {
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

appDispatcher.register(payload => {
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
    case eventConstants.INCREMENT_LEFT_FOR_SELECTED_FILE_FRAME:
      fileFrame.left++;
      change();
      break;
    case eventConstants.RENAME_ANIMATION:
      appDispatcher.waitFor([animationStore.dispatchToken]);
      handleAnimationNameChange(action.data.oldName, action.data.newName);
      break;
    case eventConstants.RENAME_FILE:
      appDispatcher.waitFor([fileStore.dispatchToken]);
      handleFileNameChange(action.data.oldPath, action.data.newName);
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
    case eventConstants.SET_VISIBILITY_FOR_SELECTED_FILE_FRAME:
      fileFrame.visible = action.data;
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

export default frameStore;
