import appDispatcher from '../dispatcher/app-dispatcher';
import events from '../constants/events';

var fileActions = {
  addFile(fileName) {
    appDispatcher.handleAction({
      actionType: events.ADD_FILE,
      data: fileName
    });
  },

  renameFile(oldName, newName) {
    appDispatcher.handleAction({
      actionType: events.RENAME_FILE,
      data: {
        newName: newName,
        oldName: oldName
      }
    });
  },

  selectFileByName(fileName) {
    appDispatcher.handleAction({
      actionType: events.SELECT_FILE_BY_NAME,
      data: fileName
    });
  },

  moveSelectedFileUp() {
    appDispatcher.handleAction({
      actionType: events.MOVE_SELECTED_FILE_UP,
      data: null
    });
  },

  moveSelectedFileDown() {
    appDispatcher.handleAction({
      actionType: events.MOVE_SELECTED_FILE_DOWN,
      data: null
    });
  }
};

export default fileActions;
