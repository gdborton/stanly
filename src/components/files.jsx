import React  from 'react';
import fileStore  from '../stores/files';
import fileActions  from '../actions/files';
import globalStyles  from '../global-styles';
import _assign  from 'object-assign';
import RenameModal  from './rename-modal';

var Files = React.createClass({
  getInitialState() {
    return {
      files: fileStore.getFiles(),
      selectedFile: fileStore.getSelectedFile()
    };
  },

  _updateFileStoreState() {
    this.setState({
      files: fileStore.getFiles(),
      selectedFile: fileStore.getSelectedFile()
    });
  },

  componentDidMount() {
    fileStore.addChangeListener(this._updateFileStoreState);
  },

  componentWillUnmount() {
    fileStore.removeChangeListener(this._updateFileStoreState);
  },

  render() {
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

export default Files;
