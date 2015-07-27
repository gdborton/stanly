import appDispatcher from '../dispatcher/app-dispatcher';
import events from'../constants/events';

var contextMenuActions = {
  openContextMenu(contextMenuOptions, eventData) {
    appDispatcher.handleAction({
      actionType: events.OPEN_CONTEXT_MENU,
      data: {
        contextMenuOptions,
        eventData
      }
    });
  },

  closeContextMenu() {
    appDispatcher.handleAction({
      actionType: events.CLOSE_CONTEXT_MENU,
      data: null
    });
  }
};

export default contextMenuActions;
