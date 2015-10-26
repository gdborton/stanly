import appDispatcher from'../dispatcher/app-dispatcher';
import events from'../constants/events';

var frameActions = {
  togglePlaying() {
    appDispatcher.handleAction({
      actionType: events.TOGGLE_PLAYING,
      data: null
    });
  }
};

export default frameActions;
