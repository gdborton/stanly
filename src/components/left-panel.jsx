var React = require('react');
var globalStyles = require('../global-styles');
var Files = require('./files');
var Animations = require('./animations');

var styles = {
  container: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    height: '100%',
    padding: globalStyles.sizes.containerPadding,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },
  children: {
    flex: 1
  }
};

var LeftPanel = React.createClass({
  render: function() {
    return (
      <div style={styles.container}>
        <Files style={styles.children} />
        <Animations style={styles.children} />
      </div>
    );
  }
});

module.exports = LeftPanel;
