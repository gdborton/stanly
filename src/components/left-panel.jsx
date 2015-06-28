var React = require('react');
var globalStyles = require('../global-styles');
var Files = require('./files');

var styles = {
  container: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    height: '100%',
    padding: globalStyles.sizes.containerPadding,
    boxSizing: 'border-box'
  }
};

var LeftPanel = React.createClass({
  render: function() {
    return (
      <div style={styles.container}>
        <Files />
      </div>
    );
  }
});

module.exports = LeftPanel;
