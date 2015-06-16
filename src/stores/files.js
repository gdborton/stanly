var events = require('events');
var _assign = require('object-assign');
var eventConstants = require('../constants/events');
var appDispatcher = require('../dispatcher/app-dispatcher');

var _files = [];
var _selectedFile = null;

var fileStore = _assign({}, events.prototype, {
  addChangeListener: function(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener: function() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getFiles: function() {
    return _files;
  },

  getSelectedFile: function() {
    return _selectedFile;
  }
});

var change = function() {
  fileStore.emit(eventConstants.CHANGE);
};

appDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.actionType) {
    case eventConstants.ADD_FILE:
      _files.push(action.data);
      change();
      break;
    case eventConstants.SELECT_FILE:
      _selectedFile = action.data;
      change();
      break;
    default:
      return true;
  }
});

module.exports = fileStore;
