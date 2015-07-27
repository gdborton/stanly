import React  from 'react';
import fileStore  from '../stores/files';
import fileActions  from '../actions/files';
import globalStyles  from '../global-styles';
import _assign  from 'object-assign';
import RenameModal  from './rename-modal';
import contextMenuActions from '../actions/context-menu';

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

      return <div style={style} onClick={this._handleSelectFile.bind(this, file)} onContextMenu={this._handleContextMenu.bind(this, file)}>{file.name}</div>
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

  _handleFileNameChange(value) {
    fileActions.renameFile(this.state.selectedFile, value);
    this.setState({
      renaming: false
    });
  },

  _handleContextMenu(file, event) {
    fileActions.selectFile(file);
    contextMenuActions.openContextMenu([{
      display: 'Rename',
      onClick: () => {
        this.setState({renaming: true});
      }
    }], event);
  }
});

export default Files;
