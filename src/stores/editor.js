import {EventEmitter} from 'events';
import _assign from 'object-assign';
import eventConstants from '../constants/events';
import appDispatcher from '../dispatcher/app-dispatcher';

function editorDefaults() {
  return {
    width: 300,
    height: 300,
    files: [],
    animations: {}
  }
}

function selectionDefaults() {
  return {
    selectedFile: null,
    selectedFrame: null,
    selectedAnimation: null
  };
}

var editorValues = editorDefaults();
var selections = selectionDefaults();

var editorStore = _assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getWidth() {
    return editorValues.width;
  },

  getHeight() {
    return editorValues.height;
  },

  getSnapshot() {
    return {...editorValues}
  },

  getSelectedFile() {
    return selections.selectedFile;
  },

  getAnimations() {
    return Object.keys(editorValues.animations);
  },

  getSelectedAnimation() {
    return selections.selectedAnimation;
  }
});

var change = function() {
  editorStore.emit(eventConstants.CHANGE);
};

function handleAddFile(newFile) {
  var fileIndex = 0;
  var matchingFileExists = editorValues.files.filter(file => {
    return file.name === newFile.name;
  }).length > 0;

  if (!matchingFileExists) {
    if (!selections.selectedFile) {
      selections.selectedFile = newFile;
    }

    fileIndex = editorValues.files.push(newFile.name) - 1;
    change();
  }

  Object.keys(editorValues.animations).forEach((animationName) => {
    var frames = editorValues.animations[animationName];
    if (!frames.length) {
      frames.push({
        duration: 500,
        files: {}
      });

      if (!selections.selectedFrame) {
        selections.selectedFrame = frames[0];
      }
    }

    frames.forEach(frame => {
      if (!frame.files[fileIndex]) {
        frame.files[fileIndex] = {
          top: 0,
          left: 0,
          rotation: 0,
          visible: true
        }
      }
    });
  });
};

editorStore.dispatchToken = appDispatcher.register(payload => {
  var action = payload.action;
  switch (action.actionType) {
    case eventConstants.ADD_FILE:
      handleAddFile(action.data);
      break;
    case eventConstants.ADD_ANIMATION:
      var animation = action.data ? action.data : 'Untitled ' + Object.keys(editorValues.animations).length;
      editorValues.animations[animation] = [];
      selections.selectedAnimation = animation;
      change();
      break;
    case eventConstants.DELETE_ANIMATION:
      var animations = Object.keys(editorValues.animations);
      var index = animations.indexOf(action.data);

      if (index !== -1) {
        delete editorValues.animations[action.data];
        animations.splice(index, 1);

        if (index === animations.length) {
          selections.selectedAnimation = animations[animations.length - 1];
        } else {
          selections.selectedAnimation = selections.animations[index];
        }

        change();
      }

      break;
    case eventConstants.RENAME_ANIMATION:
      editorValues.animations[action.data.newName] = editorValues.animations[action.data.oldName];
      delete editorValues.animations[action.data.oldName];
      if (selections.selectedAnimation = action.data.oldName) {
        selections.selectedAnimation = action.data.newName;
      }

      change();
      break;
    case eventConstants.SELECT_ANIMATION:
      selections.selectedAnimation = action.data;
      change();
      break;
    case eventConstants.SET_CANVAS_WIDTH:
      editorValues.width = action.data;
      change();
      break;
    case eventConstants.SET_CANVAS_HEIGHT:
      editorValues.height = action.data;
      change();
      break;
    case eventConstants.RESET:
      editorValues = editorDefaults();
      selections = selectionDefaults();
      change();
      break;
    default:
      return true;
  }
});

export default editorStore;
