import appDispatcher from'../dispatcher/app-dispatcher';
import events from'../constants/events';

var renameModalActions = {
  open(originalValue, onChange) {
    appDispatcher.handleAction({
      actionType: events.OPEN_RENAME_MODAL,
      data: {
        originalValue,
        onChange
      }
    });
  },

  close() {
    appDispatcher.handleAction({
      actionType: events.CLOSE_RENAME_MODAL,
      data: null
    });
  }
};

export default renameModalActions;
