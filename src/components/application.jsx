var React = require('react');
var CanvasPanel = require('./canvas-panel');
var FrameEditorPanel = require('./frame-editor-panel');
var globalStyles = require('../global-styles');
var LeftPanel = require('./left-panel');

var styles= {
  application: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    color: globalStyles.colors.textColor,
    display: 'flex'
  }
}

var Application = React.createClass({
  render: function() {
    return (
      <div style={styles.application}>
        <LeftPanel />
        <CanvasPanel />
        <FrameEditorPanel />
      </div>
    );
  }
});

React.render(<Application/>, document.body);

module.exports = Application;
