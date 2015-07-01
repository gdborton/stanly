var React = require('react');
var globalStyles = require('../global-styles');
var Canvas = require('./canvas');
var CanvasSettings = require('./canvas-settings');
var Frames = require('./frames');

var borderStyle = '1px solid #181a1f';
var styles = {
  container: {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

  canvasContainer: {
    backgroundColor: globalStyles.colors.insidePanelBackground,
    border: borderStyle,
    flex: 1,
    overflow: 'auto'
  },

  canvasSettingsContainer: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    padding: globalStyles.sizes.containerPadding
  },

  framesContainer: {

  }
};

var CanvasPanel = React.createClass({
  render: function() {
    return (
      <div style={styles.container}>
        <div style={styles.framesContainer}>
          <Frames />
        </div>
        <div style={styles.canvasContainer}>
          <Canvas />
        </div>
        <div style={styles.canvasSettingsContainer}>
          <CanvasSettings />
        </div>
      </div>
    );
  }
});

module.exports = CanvasPanel;
