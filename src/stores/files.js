import {EventEmitter} from 'events';
import _assign from 'object-assign';
import eventConstants from '../constants/events';
import appDispatcher from '../dispatcher/app-dispatcher';
import fs from 'fs';

var _files = [];
var _selectedFile = null;

var fileStore = _assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getFiles() {
    return _files;
  },

  getSelectedFile() {
    return _selectedFile;
  }
});

var change = function() {
  fileStore.emit(eventConstants.CHANGE);
};

fileStore.dispatchToken = appDispatcher.register(payload => {
  var action = payload.action;
  var fileIndex;
  switch (action.actionType) {
    case eventConstants.ADD_FILE:
      var matchingFileExists = _files.filter(file => {
        return file.name === action.data.name;
      }).length > 0;

      if (!matchingFileExists) {
        if (!_selectedFile) {
          _selectedFile = action.data;
        }

        _files.push(action.data);
        change();
      }

      break;
    case eventConstants.SELECT_FILE:
      _selectedFile = action.data;
      change();
      break;
    case eventConstants.SELECT_FILE_BY_NAME:
      var matchingFile = _files.filter(file => {
        return file.name === action.data;
      })[0];

      if (matchingFile) {
        _selectedFile = matchingFile;
        change();
      }

      break;
    case eventConstants.MOVE_SELECTED_FILE_DOWN:
      fileIndex = _files.indexOf(_selectedFile);
      if (fileIndex !== _files.length - 1) {
        _files[fileIndex] = _files[fileIndex + 1];
        _files[fileIndex + 1] = _selectedFile;
        change();
      }

      break;
    case eventConstants.MOVE_SELECTED_FILE_UP:
      fileIndex = _files.indexOf(_selectedFile);
      if (fileIndex !== 0) {
        _files[fileIndex] = _files[fileIndex - 1];
        _files[fileIndex - 1] = _selectedFile;
        change();
      }

      break;
    case eventConstants.RENAME_FILE:
      var newPath = action.data.file.path.substring(0, action.data.file.path.lastIndexOf('/') + 1) + action.data.newName;
      fs.rename(action.data.file.path, newPath, err => {
        if (!err) {
          action.data.file.path = newPath;
          action.data.file.name = action.data.newName;
          change();
        }
      });

      break;
    case eventConstants.RESET:
      _files = [];
      _selectedFile = null;
      break;
    default:
      return true;
  }
});

export default fileStore;
