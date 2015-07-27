import React from 'react';
import globalStyles from '../global-styles';
import keyConstants from '../constants/keys';
import renameModalStore from '../stores/rename-modal';
import renameModalActions from '../actions/rename-modal';

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
  getInitialState() {
    return {
      originalValue: renameModalStore.getOriginalValue(),
      value: renameModalStore.getOriginalValue(),
      open: renameModalStore.getIsOpen(),
      changeCallback: renameModalStore.getChangeCallback()
    }
  },

  updateState() {
    this.setState({
      originalValue: renameModalStore.getOriginalValue(),
      open: renameModalStore.getIsOpen(),
      value: renameModalStore.getOriginalValue(),
      changeCallback: renameModalStore.getChangeCallback()
    });
  },

  componentDidMount() {
    renameModalStore.addChangeListener(this.updateState);
  },

  componentDidUpdate() {
    if (this.refs.input) {
      this.refs.input.getDOMNode().focus();
    }
  },

  componentWillUnmount() {
    renameModalStore.renameChangeListener(this.updateState);
  },

  render() {
    if (!this.state.open) {
      return null;
    }

    return (
      <div style={styles.backdrop}>
        <div style={styles.renameContainer}>
          <input ref="input" style={styles.input} value={this.state.value} onChange={this._handleChange} onKeyPress={this._handleKeyPress} type="text"/>
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
      this.state.changeCallback(event.target.value);
      renameModalActions.close();
    }
  }
});

export default RenameModal;
