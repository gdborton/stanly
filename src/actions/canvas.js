import appDispatcher from '../dispatcher/app-dispatcher';
import events from'../constants/events';

var canvasActions = {
  setHeight(height) {
    appDispatcher.handleAction({
      actionType: events.SET_CANVAS_HEIGHT,
      data: height
    });
  },

  setWidth(width) {
    appDispatcher.handleAction({
      actionType: events.SET_CANVAS_WIDTH,
      data: width
    });
  }
};

export default canvasActions;
