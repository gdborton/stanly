var React = require('react');
var frameStore = require('../stores/frames');
var fileStore = require('../stores/files');
var frameActions = require('../actions/frames');
var globalStyles = require('../global-styles');

var styles = {
  container: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    width: 200,
    padding: globalStyles.sizes.containerPadding,
    boxSizing: 'border-box'
  }
};

var FrameEditorPanel = React.createClass({
  getInitialState: function() {
    return {
      selectedFrame: frameStore.getSelectedFrame(),
      selectedFile: fileStore.getSelectedFile()
    }
  },

  _updateFrameStoreState: function() {
    this.setState({
      selectedFrame: frameStore.getSelectedFrame()
    });
  },

  _updateFileStoreState: function() {
    this.setState({
      selectedFile: fileStore.getSelectedFile()
    });
  },

  componentDidMount: function() {
    frameStore.addChangeListener(this._updateFrameStoreState);
    fileStore.addChangeListener(this._updateFileStoreState);
  },

  componentWillUnmount: function() {
    frameStore.removeChangeListener(this._updateFrameStoreState);
    fileStore.removeChangeListener(this._updateFileStoreState);
  },

  render: function() {
    var editingObject = {};
    if (this.state.selectedFrame && this.state.selectedFile) {
      editingObject = this.state.selectedFrame.files[this.state.selectedFile.path];
    }

    return (
      <div style={styles.container}>
        <div>{this.state.selectedFile ? this.state.selectedFile.name + '\'s' : ''} settings</div>
        top: <input value={editingObject.top} onChange={this._handleTopChange} />
        left: <input value={editingObject.left} onChange={this._handleLeftChange} />
        Rotation: <input value={editingObject.rotation} onChange={this._handleRotationChange} />
        Visible: <input type="checkbox" checked={editingObject.visible} onChange={this._handleToggleVisibility} />
      <div>
        Frame Settings
        Duration: <input value={this.state.selectedFrame ? this.state.selectedFrame.duration : 0} onChange={this._handleDurationChange} />
      </div>
      </div>
    );
  },

  _handleTopChange: function(event) {
    frameActions.setTop(event.target.value);
  },

  _handleLeftChange: function(event) {
    frameActions.setLeft(event.target.value);
  },

  _handleRotationChange: function(event) {
    frameActions.setRotation(event.target.value);
  },

  _handleToggleVisibility: function(event) {
    frameActions.toggleFileVisibity();
  },

  _handleDurationChange: function(event) {
    frameActions.setDuration(event.target.value);
  }
});

module.exports = FrameEditorPanel;
