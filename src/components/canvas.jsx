import React from 'react';
import frameStore from '../stores/frames';
import canvasActions from '../actions/canvas';
import editorStore from '../stores/editor';
import _assign from 'object-assign';

var Canvas = React.createClass({
  getInitialState() {
    return {
      selectedFrame: frameStore.getSelectedFrame(),
      files: editorStore.getFiles(),
      canvasHeight: editorStore.getHeight(),
      canvasWidth: editorStore.getWidth()
    }
  },

  _updateFrameStoreState() {
    this.setState({
      selectedFrame: frameStore.getSelectedFrame()
    });
  },

  _updateFiles() {
    this.setState({
      files: editorStore.getFiles()
    });
  },

  _updateCanvas() {
    this.setState({
      canvasHeight: editorStore.getHeight(),
      canvasWidth: editorStore.getWidth()
    });
  },

  componentDidMount() {
    frameStore.addChangeListener(this._updateFrameStoreState);
    editorStore.addChangeListener(this._updateCanvas);
    editorStore.addChangeListener(this._updateFiles);
  },

  componentWillUnmount() {
    frameStore.removeChangeListener(this._updateFrameStoreState);
    editorStore.removeChangeListener(this._updateCanvas);
    editorStore.removeChangeListener(this._updateFiles);
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
        var fileFrame = this.state.selectedFrame.files[file];
        if (fileFrame && fileFrame.visible) {
          var imageStyle = _assign({}, style.image, {
            top: fileFrame.top,
            left: fileFrame.left,
            transform: 'rotate(' + fileFrame.rotation + 'deg)'
          });

          return <img style={imageStyle} src={process.cwd() + '/' + file}/>
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
