import appDispatcher from '../dispatcher/app-dispatcher';
import events from'../constants/events';

var contextlessActions = {
  resetStores() {
    appDispatcher.handleAction({
      actionType: events.RESET
    });
  },

  importState(state) {
    appDispatcher.handleAction({
      actionType: events.IMPORT_STATE,
      data: state
    });
  }
};

export default contextlessActions;
