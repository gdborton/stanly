var React = require('react');
var fileStore = require('../stores/files');
var fileActions = require('../actions/files');
var globalStyles = require('../global-styles');
var _assign = require('object-assign');
var RenameModal = require('./rename-modal');

var Files = React.createClass({
  getInitialState: function() {
    return {
      files: fileStore.getFiles(),
      selectedFile: fileStore.getSelectedFile()
    };
  },

  _updateFileStoreState: function() {
    this.setState({
      files: fileStore.getFiles(),
      selectedFile: fileStore.getSelectedFile()
    });
  },

  componentDidMount: function() {
    fileStore.addChangeListener(this._updateFileStoreState);
  },

  componentWillUnmount: function() {
    fileStore.removeChangeListener(this._updateFileStoreState);
  },

  render: function() {
    var files = this.state.files.map(file => {
      var style = {
        cursor: 'pointer',
        backgroundColor: this.state.selectedFile === file ? globalStyles.colors.selectedColor : undefined
      };

      return <div style={style} onClick={this._handleSelectFile.bind(this, file)} onDoubleClick={this._handleDoubleClickFile.bind(this, file)}>{file.name}</div>
    });

    var style = _assign({}, this.props.style);
    return (
      <div style={style}>
        <div>Files</div>
        {files}
        {this.state.renaming ? <RenameModal value={this.state.selectedFile.name} onChange={this._handleFileNameChange}/> : null}
      </div>
    );
  },

  _handleSelectFile(file) {
    fileActions.selectFile(file);
  },

  _handleDoubleClickFile(file) {
    this.setState({
      renaming: true
    });
  },

  _handleFileNameChange(value) {
    fileActions.renameFile(this.state.selectedFile, value);
    this.setState({
      renaming: false
    });
  }
});

module.exports = Files;
