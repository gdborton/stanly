import React from 'react';
import globalStyles from '../global-styles';
import Files from './files';
import Animations from './animations';

var styles = {
  container: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    height: '100%',
    padding: globalStyles.sizes.containerPadding,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: 150
  },
  children: {
    flex: 1
  }
};

var LeftPanel = React.createClass({
  render() {
    return (
      <div style={styles.container}>
        <Files style={styles.children} />
        <Animations style={styles.children} />
      </div>
    );
  }
});

export default LeftPanel;
