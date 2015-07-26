var React = require('react');
var frameStore = require('../stores/frames');
var canvasActions = require('../actions/canvas');
var canvasStore = require('../stores/canvas');
var _assign = require('object-assign');
var fileStore = require('../stores/files');

var Canvas = React.createClass({
  getInitialState: function() {
    return {
      selectedFrame: frameStore.getSelectedFrame(),
      files: fileStore.getFiles(),
      canvasHeight: canvasStore.getHeight(),
      canvasWidth: canvasStore.getWidth()
    }
  },

  _updateFrameStoreState: function() {
    this.setState({
      selectedFrame: frameStore.getSelectedFrame()
    });
  },

  _updateFileStoreState: function() {
    this.setState({
      files: fileStore.getFiles()
    });
  },

  _updateCanvasStoreState: function() {
    this.setState({
      canvasHeight: canvasStore.getHeight(),
      canvasWidth: canvasStore.getWidth()
    });
  },

  componentDidMount: function() {
    frameStore.addChangeListener(this._updateFrameStoreState);
    canvasStore.addChangeListener(this._updateCanvasStoreState);
    fileStore.addChangeListener(this._updateFileStoreState);
  },

  componentWillUnmount: function() {
    frameStore.removeChangeListener(this._updateFrameStoreState);
    canvasStore.removeChangeListener(this._updateCanvasStoreState);
    fileStore.removeChangeListener(this._updateFileStoreState);
  },

  render: function() {
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
      images = this.state.files.map(function(file) {
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
      }.bind(this));
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

module.exports = Canvas;
