var React = require('react');
var globalStyles = require('../global-styles');
var Canvas = require('./canvas');
var CanvasSettings = require('./canvas-settings');

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
    borderLeft: borderStyle,
    borderRight: borderStyle,
    flex: 1,
    overflow: 'auto'
  },

  canvasSettingsContainer: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    borderTop: borderStyle,
    padding: globalStyles.sizes.containerPadding
  }
};

var CanvasPanel = React.createClass({
  render: function() {
    return (
      <div style={styles.container}>
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
