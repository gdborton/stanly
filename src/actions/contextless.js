import appDispatcher from '../dispatcher/app-dispatcher';
import events from '../constants/events';
import {dispatch} from '../stores/redux';

var contextlessActions = {
  resetStores() {
    appDispatcher.handleAction({
      actionType: events.RESET
    });
    dispatch({ type: events.RESET });
  },

  importState(state) {
    appDispatcher.handleAction({
      actionType: events.IMPORT_STATE,
      data: state
    });
  }
};

export default contextlessActions;
