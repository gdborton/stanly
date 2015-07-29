import appDispatcher from'../dispatcher/app-dispatcher';
import events from'../constants/events';

var frameActions = {
  addFrame() {
    appDispatcher.handleAction({
      actionType: events.ADD_FRAME,
      data: null
    });
  },

  decrementLeft() {
    appDispatcher.handleAction({
      actionType: events.DECREMENT_LEFT_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  decrementTop() {
    appDispatcher.handleAction({
      actionType: events.DECREMENT_TOP_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  deleteFrame(frame) {
    appDispatcher.handleAction({
      actionType: events.DELETE_FRAME,
      data: frame
    });
  },

  incrementLeft() {
    appDispatcher.handleAction({
      actionType: events.INCREMENT_LEFT_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  incrementTop() {
    appDispatcher.handleAction({
      actionType: events.INCREMENT_TOP_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  rotateLeft() {
    appDispatcher.handleAction({
      actionType: events.ROTATE_LEFT_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  rotateRight() {
    appDispatcher.handleAction({
      actionType: events.ROTATE_RIGHT_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  selectFrame(frame) {
    appDispatcher.handleAction({
      actionType: events.SELECT_FRAME,
      data: frame
    });
  },

  setDuration(duration) {
    appDispatcher.handleAction({
      actionType: events.SET_DURATION_FOR_SELECTED_FRAME,
      data: duration
    });
  },

  setRotation(rotation) {
    appDispatcher.handleAction({
      actionType: events.SET_ROTATION_FOR_SELECTED_FILE_FRAME,
      data: rotation
    });
  },

  setTop(top) {
    appDispatcher.handleAction({
      actionType: events.SET_TOP_FOR_SELECTED_FILE_FRAME,
      data: top
    });
  },

  setLeft(left) {
    appDispatcher.handleAction({
      actionType: events.SET_LEFT_FOR_SELECTED_FILE_FRAME,
      data: left
    });
  },

  setVisible(visible) {
    appDispatcher.handleAction({
      actionType: events.SET_VISIBILITY_FOR_SELECTED_FILE_FRAME,
      data: visible
    });
  },

  toggleFileVisibity() {
    appDispatcher.handleAction({
      actionType: events.TOGGLE_VISIBILITY_FOR_SELECTED_FILE_FRAME,
      data: null
    });
  },

  togglePlaying() {
    appDispatcher.handleAction({
      actionType: events.TOGGLE_PLAYING,
      data: null
    });
  }
};

export default frameActions;
