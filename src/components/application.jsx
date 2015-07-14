var React = require('react');
var CanvasPanel = require('./canvas-panel');
var FrameEditorPanel = require('./frame-editor-panel');
var globalStyles = require('../global-styles');
var LeftPanel = require('./left-panel');
var keyConstants = require('../constants/keys');
var frameActions = require('../actions/frames');
var fileActions = require('../actions/files');
require('../utils/export-handler');

var styles = {
  application: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    color: globalStyles.colors.textColor,
    display: 'flex'
  }
};

var Application = React.createClass({
  componentDidMount: function() {
    document.body.onkeydown = this._handleKeyUp;
  },

  render: function() {
    return (
      <div style={styles.application}>
        <LeftPanel />
        <CanvasPanel />
        <FrameEditorPanel />
      </div>
    );
  },

  _handleKeyUp: function(event) {
    console.log('key pressed', event.which);
    var keyHandlers = {};
    keyHandlers[keyConstants.UP] = function(event) {
      event.ctrlKey ? fileActions.moveSelectedFileUp() : frameActions.decrementTop();
    };

    keyHandlers[keyConstants.DOWN] = function() {
      event.ctrlKey ? fileActions.moveSelectedFileDown() : frameActions.incrementTop();
    };

    keyHandlers[keyConstants.LEFT] = frameActions.decrementLeft;
    keyHandlers[keyConstants.RIGHT] = frameActions.incrementLeft;
    keyHandlers[keyConstants.PAGE_UP] = frameActions.rotateLeft;
    keyHandlers[keyConstants.PAGE_DOWN] = frameActions.rotateRight;

    var focus = document.querySelector(':focus');
    if ((!focus || focus.tagName !== 'INPUT') && keyHandlers[event.which]) {
      event.preventDefault();
      keyHandlers[event.which](event);
    }
  }
});

React.render(<Application/>, document.body);

module.exports = Application;
