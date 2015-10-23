import appDispatcher from '../dispatcher/app-dispatcher';
import events from '../constants/events';
import {dispatch} from '../stores/redux';

function addAnimation(animationName) {
  return {
    type: events.ADD_ANIMATION,
    animationName
  };
}

function selectAnimation(animationName) {
  return {
    type: events.SELECT_ANIMATION,
    animationName
  }
};

var animationActions = {
  addAnimation(animationName) {
    dispatch(addAnimation(animationName));
    dispatch(selectAnimation(animationName));
  },

  selectAnimation(animationName) {
    dispatch(selectAnimation(animationName));
  },

  renameAnimation(animation, newName) {
    appDispatcher.handleAction({
      actionType: events.RENAME_ANIMATION,
      data: {
        oldName: animation,
        newName: newName
      }
    });
  },

  deleteAnimation(animation) {
    appDispatcher.handleAction({
      actionType: events.DELETE_ANIMATION,
      data: animation
    });
  }
};

export default animationActions;
