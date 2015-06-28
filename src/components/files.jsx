var React = require('react');
var fileStore = require('../stores/files');
var fileActions = require('../actions/files');
var globalStyles = require('../global-styles');
var _assign = require('object-assign');

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
    var files = this.state.files.map(function(file) {
      var style = {
        cursor: 'pointer',
        backgroundColor: this.state.selectedFile === file ? '#29516d' : undefined
      };

      return <div style={style} onClick={this._handleSelectFile.bind(this, file)}>{file.name}</div>
    }.bind(this));
    var style = _assign({}, this.props.style);
    return (
      <div style={style}>
        <div>Files</div>
        <input multiple={true} type='file' accept="image/x-png, image/gif, image/jpeg" onChange={this._handleFileChange}/>
        {files}
      </div>
    );
  },

  _handleFileChange: function(event) {
    var files = event.target.files;
    if (files.length) {
      [].forEach.call(files, function (file) {
        fileActions.addFile(file.name, file.path);
      });
    }
  },

  _handleSelectFile: function(file) {
    fileActions.selectFile(file);
  }
});

module.exports = Files;
