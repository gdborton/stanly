import appDispatcher from '../dispatcher/app-dispatcher';
import events from'../constants/events';

var contextlessActions = {
  resetStores() {
    appDispatcher.handleAction({
      actionType: events.RESET
    });
  }
};

export default contextlessActions;
