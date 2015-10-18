import {EventEmitter} from 'events';
import _assign from 'object-assign';
import eventConstants from '../constants/events';
import appDispatcher from '../dispatcher/app-dispatcher';
import fs from 'fs';

function exportDefaults() {
  return {
    width: 300,
    height: 300,
    files: [],
    animations: {}
  }
}

function stateDefaults() {
  return {
    isPlaying: false,
    frameTimer: false,
    selections: {
      selectedFile: null,
      selectedFrame: null,
      selectedAnimation: null
    }
  };
}

var exportValues = exportDefaults();
var state = stateDefaults();

var editorStore = _assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getFiles() {
    return exportValues.files;
  },

  getSelectedFile() {
    return state.selections.selectedFile;
  },

  getWidth() {
    return exportValues.width;
  },

  getHeight() {
    return exportValues.height;
  },

  getSnapshot() {
    return {...exportValues}
  },

  getAnimations() {
    return Object.keys(exportValues.animations);
  },

  getSelectedAnimation() {
    return state.selections.selectedAnimation;
  }
});

var change = function() {
  editorStore.emit(eventConstants.CHANGE);
};

function handleAddFile(newFile) {
  var fileIndex = 0;
  var matchingFileExists = exportValues.files.filter(file => {
    return file === newFile;
  }).length > 0;

  if (!matchingFileExists) {
    if (!state.selections.selectedFile) {
      state.selections.selectedFile = newFile;
    }

    fileIndex = exportValues.files.push(newFile) - 1;
    change();
  }

  Object.keys(exportValues.animations).forEach((animationName) => {
    var frames = exportValues.animations[animationName];
    if (!frames.length) {
      frames.push({
        duration: 500,
        files: {}
      });

      if (!state.selections.selectedFrame) {
        state.selections.selectedFrame = frames[0];
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
  var fileIndex;
  switch (action.actionType) {
    case eventConstants.ADD_FILE:
      handleAddFile(action.data);
      break;
    case eventConstants.SELECT_FILE_BY_NAME:
      state.selections.selectedFile = action.data;
      change();
      break;
    case eventConstants.MOVE_SELECTED_FILE_DOWN:
      fileIndex = exportValues.files.indexOf(state.selections.selectedFile);
      if (fileIndex !== exportValues.files.length - 1) {
        exportValues.files[fileIndex] = exportValues.files[fileIndex + 1];
        exportValues.files[fileIndex + 1] = state.selections.selectedFile;
        change();
      }

      break;
    case eventConstants.MOVE_SELECTED_FILE_UP:
      fileIndex = exportValues.files.indexOf(state.selections.selectedFile);
      if (fileIndex !== 0) {
        exportValues.files[fileIndex] = exportValues.files[fileIndex - 1];
        exportValues.files[fileIndex - 1] = state.selections.selectedFile;
        change();
      }

      break;
    case eventConstants.RENAME_FILE:
      fs.rename('./'+ action.data.oldName, './' + action.data.newName, err => {
        if (!err) {
          var oldIndex = exportValues.files.indexOf(action.data.oldName);
          exportValues.files[oldIndex] = action.data.newName;
          if (state.selections.selectedFile === action.data.oldName) {
            state.selections.selectedFile = action.data.newName;
          }
          change();
        }
      });

      break;
    case eventConstants.ADD_ANIMATION:
      var animation = action.data ? action.data : 'Untitled ' + Object.keys(exportValues.animations).length;
      exportValues.animations[animation] = [];
      state.selections.selectedAnimation = animation;
      change();
      break;
    case eventConstants.DELETE_ANIMATION:
      var animations = Object.keys(exportValues.animations);
      var index = animations.indexOf(action.data);

      if (index !== -1) {
        delete exportValues.animations[action.data];
        animations.splice(index, 1);

        if (index === animations.length) {
          state.selections.selectedAnimation = animations[animations.length - 1];
        } else {
          state.selections.selectedAnimation = state.selections.animations[index];
        }

        change();
      }

      break;
    case eventConstants.RENAME_ANIMATION:
      exportValues.animations[action.data.newName] = exportValues.animations[action.data.oldName];
      delete exportValues.animations[action.data.oldName];
      if (state.selections.selectedAnimation = action.data.oldName) {
        state.selections.selectedAnimation = action.data.newName;
      }

      change();
      break;
    case eventConstants.SELECT_ANIMATION:
      state.selections.selectedAnimation = action.data;
      change();
      break;
    case eventConstants.SET_CANVAS_WIDTH:
      exportValues.width = action.data;
      change();
      break;
    case eventConstants.SET_CANVAS_HEIGHT:
      exportValues.height = action.data;
      change();
      break;
    case eventConstants.RESET:
      exportValues = exportDefaults();
      state.selections = stateDefaults();
      change();
      break;
    default:
      return true;
  }
});

export default editorStore;
