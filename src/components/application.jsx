var React = require('react');
var CanvasPanel = require('./canvas-panel');
var FrameEditorPanel = require('./frame-editor-panel');
var globalStyles = require('../global-styles');
var LeftPanel = require('./left-panel');
var keyConstants = require('../constants/keys');
var frameActions = require('../actions/frames');
var fileActions = require('../actions/files');

var styles= {
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
    var focus = document.querySelector(':focus');
    if (!focus || focus.tagName !== 'INPUT') {
      event.preventDefault();
      if (event.which === keyConstants.UP) {
        if (event.ctrlKey) {
          fileActions.moveSelectedFileUp();
        } else {
          frameActions.decrementTop();
        }
      } else if (event.which === keyConstants.DOWN) {
        if (event.ctrlKey) {
          fileActions.moveSelectedFileDown();
        } else {
          frameActions.incrementTop();
        }
      } else if (event.which === keyConstants.LEFT) {
        frameActions.decrementLeft();
      } else if (event.which === keyConstants.RIGHT) {
        frameActions.incrementLeft();
      } else if (event.which === keyConstants.PAGE_UP) {
        frameActions.rotateLeft();
      } else if (event.which === keyConstants.PAGE_DOWN) {
        frameActions.rotateRight();
      }
    }
  }
});

React.render(<Application/>, document.body);

module.exports = Application;
