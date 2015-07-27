import React from 'react';
import frameStore from '../stores/frames';
import canvasActions from '../actions/canvas';
import canvasStore from '../stores/canvas';
import _assign from 'object-assign';
import fileStore from '../stores/files';

var Canvas = React.createClass({
  getInitialState() {
    return {
      selectedFrame: frameStore.getSelectedFrame(),
      files: fileStore.getFiles(),
      canvasHeight: canvasStore.getHeight(),
      canvasWidth: canvasStore.getWidth()
    }
  },

  _updateFrameStoreState() {
    this.setState({
      selectedFrame: frameStore.getSelectedFrame()
    });
  },

  _updateFileStoreState() {
    this.setState({
      files: fileStore.getFiles()
    });
  },

  _updateCanvasStoreState() {
    this.setState({
      canvasHeight: canvasStore.getHeight(),
      canvasWidth: canvasStore.getWidth()
    });
  },

  componentDidMount() {
    frameStore.addChangeListener(this._updateFrameStoreState);
    canvasStore.addChangeListener(this._updateCanvasStoreState);
    fileStore.addChangeListener(this._updateFileStoreState);
  },

  componentWillUnmount() {
    frameStore.removeChangeListener(this._updateFrameStoreState);
    canvasStore.removeChangeListener(this._updateCanvasStoreState);
    fileStore.removeChangeListener(this._updateFileStoreState);
  },

  render() {
    var style = {
      canvas: {
        position: 'relative',
        border: '1px solid black',
        overflow: 'hidden',
        height: this.state.canvasHeight,
        width: this.state.canvasWidth,
        background: 'URL(assets/img/transparent-bg.png)',
        margin: '200px auto'
      },

      container: {

      },

      image: {
        position: 'absolute'
      }
    };
    var images = [];
    if (this.state.selectedFrame) {
      images = this.state.files.map((file) => {
        var fileFrame = this.state.selectedFrame.files[file.path];
        if (fileFrame && fileFrame.visible) {
          var imageStyle = _assign({}, style.image, {
            top: fileFrame.top,
            left: fileFrame.left,
            transform: 'rotate(' + fileFrame.rotation + 'deg)'
          });

          return <img style={imageStyle} src={file.path}/>
        } else {
          return null;
        }
      });
    }

    return (
      <div style={style.container}>
        <div style={style.canvas}>
          {images}
        </div>
      </div>
    );
  }
});

export default Canvas;
