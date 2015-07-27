import React from 'react';
import globalStyles from '../global-styles';
import contextMenuActions from '../actions/context-menu';

var ContextMenuItem = React.createClass({
  propTypes: {
    display: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      hover: false
    }
  },

  render() {
    var style = {
      backgroundColor: this.state.hover ? globalStyles.colors.selectedColor : undefined,
      color: this.state.hover ? undefined : '#333',
      paddingLeft: globalStyles.sizes.containerPadding,
      cursor: 'pointer'
    };

    return (
      <div style={style} onClick={this._handleItemClick} onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}>
        {this.props.display}
      </div>
    );
  },

  _handleItemClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
    contextMenuActions.closeContextMenu();
  },

  _handleMouseEnter() {
    this.setState({
      hover: true
    });
  },

  _handleMouseLeave() {
    this.setState({
      hover: false
    });
  }
});

export default ContextMenuItem;
