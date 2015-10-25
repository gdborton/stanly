import {EventEmitter} from 'events';
import _assign from 'object-assign';
import eventConstants from '../constants/events';
import appDispatcher from '../dispatcher/app-dispatcher';

import reduxStore from './redux';
import actionCreators from '../actions/action-creators';

function stateDefaults() {
  return {
    isPlaying: false,
    frameTimer: false
  };
}

var state = stateDefaults();

var editorStore = _assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.addListener(eventConstants.CHANGE, callback);
  },

  removeChangeListener() {
    this.removeListener(eventConstants.CHANGE, callback);
  },

  getIsPlaying() {
    return state.isPlaying;
  }
});

var change = function() {
  editorStore.emit(eventConstants.CHANGE);
};

var togglePlaying = function() {
  state.isPlaying = !state.isPlaying;
  if (state.isPlaying) {
    setupTimer();
  } else {
    clearInterval(state.frameTimer);
  }
};

var setupTimer = function() {
  var reduxState = reduxStore.getState();
  var frames = reduxState.entities.animations[reduxState.selectedAnimation].frames;

  state.frameTimer = setTimeout(() => {
    var selectedFrameIndex = frames.indexOf(redux.selectedFrame);

    if (selectedFrameIndex === frames.length - 1) {
      reduxState.dispatch(actionCreators.selectFrame(frames[0].id));
    } else {
      reduxState.dispatch(actionCreators.selectFrame(frames[selectedFrameIndex + 1].id));
    }

    setupTimer();
  }, reduxState.entities.frames[redux.selectedFrame].duration);
};

editorStore.dispatchToken = appDispatcher.register(payload => {
  var action = payload.action;
  switch (action.actionType) {
    case eventConstants.TOGGLE_PLAYING:
      togglePlaying();
      change();
      break;
    case eventConstants.RESET:
      clearInterval(state.frameTimer);
      state = stateDefaults();
      change();
      break;
    default:
      return true;
  }
});

export default editorStore;
