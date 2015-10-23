import appDispatcher from '../dispatcher/app-dispatcher';
import events from '../constants/events';
import {dispatch} from '../stores/redux';
import frameActions from './frames';
import editorStore from '../stores/editor';

function addFile(fileName) {
  return {
    type: events.ADD_FILE,
    fileName
  };
};

function renameFile(oldName, newName) {
  return {
    type: events.RENAME_FILE,
    oldName, newName
  };
};

function selectFileByName(fileName) {
  return {
    type: events.SELECT_FILE_BY_NAME,
    fileName
  };
}

function moveSelectedFileUp() {
  return {
    type: events.MOVE_SELECTED_FILE_UP
  };
}

function moveSelectedFileDown() {
  return {
    type: events.MOVE_SELECTED_FILE_DOWN
  };
}

var fileActions = {
  addFile(fileName) {
    dispatch(addFile(fileName));
    dispatch(selectFileByName(fileName));
    if (!editorStore.getSelectedFrame()) {
      let frame = editorStore.getExportObject().animations[editorStore.getSelectedAnimation()];
      frameActions.selectFrame(frame);
    }
  },

  renameFile(oldName, newName) {
    dispatch(renameFile(oldName, newName));
  },

  selectFileByName(fileName) {
    dispatch(selectFileByName(fileName));
  },

  moveSelectedFileUp() {
    dispatch(moveSelectedFileUp());
  },

  moveSelectedFileDown() {
    dispatch(moveSelectedFileDown());
  }
};

export default fileActions;
