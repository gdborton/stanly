import React from 'react';
import globalStyles from '../global-styles';
import ContextMenuItem from './context-menu-item';
import contextMenuStore from '../stores/context-menu';
import contextMenuActions from '../actions/context-menu';

var styles = {
  backdrop: {
    position: 'fixed',
    top: 0, right: 0, bottom: 0, left: 0
  },
  contextMenu: {
    minWidth: 150,
    border: '1px solid #eee',
    backgroundColor: '#ccc',
    paddingTop: globalStyles.sizes.containerPadding,
    paddingBottom: globalStyles.sizes.containerPadding,
    display: 'inline-block',
    position: 'absolute'
  }
}

var ContextMenu = React.createClass({
  getInitialState() {
    return {
      top: contextMenuStore.getTop(),
      left: contextMenuStore.getLeft(),
      contextMenuItems: contextMenuStore.getContextMenuItems(),
      open: contextMenuStore.getIsOpen()
    }
  },

  _updateState() {
    this.setState({
      top: contextMenuStore.getTop(),
      left: contextMenuStore.getLeft(),
      contextMenuItems: contextMenuStore.getContextMenuItems(),
      open: contextMenuStore.getIsOpen()
    });
  },

  componentDidMount() {
    contextMenuStore.addChangeListener(this._updateState);
  },

  componentWillUnMount() {
    contextMenuStore.removeChangeListener(this._updateState);
  },

  render() {
    if (!this.state.open) {
      return null;
    }
    styles.contextMenu.top = this.state.top;
    styles.contextMenu.left = this.state.left;

    var menuItems = this.state.contextMenuItems.map((menuItem, index) => {
      return <ContextMenuItem key={index} onClick={menuItem.onClick} display={menuItem.display}/>;
    });

    return (
      <div style={styles.backdrop} onClick={this._handleBackdropClick}>
        <div style={styles.contextMenu}>
          {menuItems}
        </div>
      </div>
    );
  },

  _handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      contextMenuActions.closeContextMenu();
    }
  }
});

export default ContextMenu;
