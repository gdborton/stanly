import appDispatcher from '../dispatcher/app-dispatcher';
import events from '../constants/events';

var animationActions = {
  addAnimation(animationName) {
    appDispatcher.handleAction({
      actionType: events.ADD_ANIMATION,
      data: animationName
    });
  },

  selectAnimation(animation) {
    appDispatcher.handleAction({
      actionType: events.SELECT_ANIMATION,
      data: animation
    });
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
