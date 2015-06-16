var React = require('react');
var frameStore = require('../stores/frames');
var fileStore = require('../stores/files');
var frameActions = require('../actions/frames');

var FrameEditor = React.createClass({
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
      <div>
        top: <input value={editingObject.top} onChange={this._handleTopChange} />
        left: <input value={editingObject.left} onChange={this._handleLeftChange} />
      </div>
    );
  },

  _handleTopChange: function(event) {
    frameActions.setTop(event.target.value);
  },

  _handleLeftChange: function(event) {
    frameActions.setLeft(event.target.value);
  }
});

module.exports = FrameEditor;
