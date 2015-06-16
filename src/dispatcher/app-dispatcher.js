var flux = require('flux');
var appDispatcher = new flux.Dispatcher();

appDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = appDispatcher;
