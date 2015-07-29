import React from 'react';
import frameStore from '../stores/frames';
import fileStore from '../stores/files';
import frameActions from '../actions/frames';
import globalStyles from '../global-styles';

var styles = {
  container: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    width: 200,
    padding: globalStyles.sizes.containerPadding,
    boxSizing: 'border-box'
  },
  frameSettings: {
    marginTop: 50
  }
};

var FrameEditorPanel = React.createClass({
  getInitialState() {
    return {
      selectedFrame: frameStore.getSelectedFrame(),
      selectedFile: fileStore.getSelectedFile()
    }
  },

  _updateFrameStoreState() {
    this.setState({
      selectedFrame: frameStore.getSelectedFrame()
    });
  },

  _updateFileStoreState() {
    this.setState({
      selectedFile: fileStore.getSelectedFile()
    });
  },

  componentDidMount() {
    frameStore.addChangeListener(this._updateFrameStoreState);
    fileStore.addChangeListener(this._updateFileStoreState);
  },

  componentWillUnmount() {
    frameStore.removeChangeListener(this._updateFrameStoreState);
    fileStore.removeChangeListener(this._updateFileStoreState);
  },

  render() {
    var editingObject = {};
    if (this.state.selectedFrame && this.state.selectedFile) {
      editingObject = this.state.selectedFrame.files[this.state.selectedFile.path] || {};
    }

    return (
      <div style={styles.container}>
        <div>{this.state.selectedFile ? this.state.selectedFile.name + '\'s' : ''} settings</div>
        top: <input value={editingObject.top} onChange={this._handleTopChange} />
        left: <input value={editingObject.left} onChange={this._handleLeftChange} />
        Rotation: <input value={editingObject.rotation} onChange={this._handleRotationChange} />
        Visible: <input type="checkbox" checked={editingObject.visible} onChange={this._handleToggleVisibility} />
        <div style={styles.frameSettings}>
          Frame Settings
          <div>
            Duration: <input value={this.state.selectedFrame ? this.state.selectedFrame.duration : 0} onChange={this._handleDurationChange} />
          </div>
        </div>
      </div>
    );
  },

  _handleTopChange(event) {
    frameActions.setTop(event.target.value);
  },

  _handleLeftChange(event) {
    frameActions.setLeft(event.target.value);
  },

  _handleRotationChange(event) {
    frameActions.setRotation(event.target.value);
  },

  _handleToggleVisibility(event) {
    frameActions.toggleFileVisibity();
  },

  _handleDurationChange(event) {
    frameActions.setDuration(event.target.value);
  }
});

export default FrameEditorPanel;
