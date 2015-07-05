var appDispatcher = require('../dispatcher/app-dispatcher');
var events = require('../constants/events');

var animationActions = {
  addAnimation: function() {
    appDispatcher.handleAction({
      actionType: events.ADD_ANIMATION,
      data: null
    });
  },

  selectAnimation: function(animation) {
    appDispatcher.handleAction({
      actionType: events.SELECT_ANIMATION,
      data: animation
    });
  }
};

module.exports = animationActions;
