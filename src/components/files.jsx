import React  from 'react';
import editorStore  from '../stores/editor';
import fileActions  from '../actions/files';
import globalStyles  from '../global-styles';
import _assign  from 'object-assign';
import renameModalActions  from '../actions/rename-modal';
import contextMenuActions from '../actions/context-menu';

var Files = React.createClass({
  getInitialState() {
    return {
      files: editorStore.getFiles(),
      selectedFile: editorStore.getSelectedFile()
    };
  },

  _updateFiles() {
    this.setState({
      files: editorStore.getFiles(),
      selectedFile: editorStore.getSelectedFile()
    });
  },

  componentDidMount() {
    editorStore.addChangeListener(this._updateFiles);
  },

  componentWillUnmount() {
    editorStore.removeChangeListener(this._updateFiles);
  },

  render() {
    var files = this.state.files.map(file => {
      var style = {
        cursor: 'pointer',
        backgroundColor: this.state.selectedFile === file ? globalStyles.colors.selectedColor : undefined
      };

      return <div style={style} onClick={this._handleSelectFile.bind(this, file)} onContextMenu={this._handleContextMenu.bind(this, file)}>{file}</div>
    });

    var style = _assign({}, this.props.style);
    return (
      <div style={style}>
        <div>Files</div>
        {files}
      </div>
    );
  },

  _handleSelectFile(file) {
    fileActions.selectFileByName(file);
  },

  _handleContextMenu(file, event) {
    fileActions.selectFileByName(file);
    contextMenuActions.openContextMenu([{
      display: 'Rename',
      onClick: () => {
        renameModalActions.open(file, fileActions.renameFile.bind(this, this.state.selectedFile));
      }
    }], event);
  }
});

export default Files;
