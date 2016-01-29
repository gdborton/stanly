import React  from 'react';
import globalStyles  from '../global-styles';
import renameModalActions  from '../actions/rename-modal';
import contextMenuActions from '../actions/context-menu';

var Files = React.createClass({
  getDefaultProps(){
    return {files: []}
  },
  render() {
    var files = this.props.files.map(file => {
      var style = {
        cursor: 'pointer',
        backgroundColor: this.props.selectedFileId === file.id ? globalStyles.colors.selectedColor : undefined
      };

      return <div style={style} key={file.id} onClick={this._handleSelectFile.bind(this, file)} onContextMenu={this._handleContextMenu.bind(this, file)}>{file.name}</div>
    });

    var style = {...this.props.style};
    return (
      <div style={style}>
        <div>Files</div>
        {files}
      </div>
    );
  },

  _handleSelectFile(file) {
    this.props.onSelectFile(file);
  },

  _handleContextMenu(file, event) {
    this.props.onSelectFile(file);
    contextMenuActions.openContextMenu([{
      display: 'Rename',
      onClick: () => {
        renameModalActions.open(file.name, (newName) => {this.props.onRenameFile(file, newName)});
      }
    }], event);
  }
});

export default Files;
