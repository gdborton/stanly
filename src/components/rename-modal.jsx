import React from 'react';
import globalStyles from '../global-styles';
import keyConstants from '../constants/keys';

var styles = {
  backdrop: {
    backgroundColor: 'rgba(0,0,0,.6)',
    position: 'fixed',
    top: 0, right: 0, bottom: 0, left: 0
  },
  renameContainer: {
    width: 400,
    margin: '0 auto',
    border: '1px solid #181a1f',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    padding: globalStyles.sizes.containerPadding
  },
  input: {
    width: '100%',
    boxSizing: 'border-box'
  }
};

var RenameModal = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      value: this.props.value
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      });
    }
  },

  render() {
    return (
      <div style={styles.backdrop}>
        <div style={styles.renameContainer}>
          <input style={styles.input} value={this.state.value} onChange={this._handleChange} onKeyPress={this._handleKeyPress} type="text"/>
        </div>
      </div>
    );
  },

  _handleChange(event) {
    this.setState({
      value: event.target.value
    });
  },

  _handleKeyPress(event) {
    if (event.which === keyConstants.ENTER) {
      this.props.onChange(event.target.value);
    }
  }
});

export default RenameModal;
