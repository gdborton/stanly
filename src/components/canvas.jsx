var React = require('react');
var frameStore = require('../stores/frames');
var canvasActions = require('../actions/canvas');
var canvasStore = require('../stores/canvas');
var _assign = require('object-assign');

var Canvas = React.createClass({
  getInitialState: function() {
    return {
      selectedFrame: frameStore.getSelectedFrame(),
      canvasHeight: canvasStore.getHeight(),
      canvasWidth: canvasStore.getWidth()
    }
  },

  _updateFrameStoreState: function() {
    this.setState({
      selectedFrame: frameStore.getSelectedFrame(),
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
  },

  componentWillUnmount: function() {
    frameStore.removeChangeListener(this._updateFrameStoreState);
    canvasStore.removeChangeListener(this._updateCanvasStoreState);
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
      images = Object.keys(this.state.selectedFrame.files).map(function(filePath) {
        var imageStyle = _assign({}, style.image, {
          top: this.state.selectedFrame.files[filePath].top,
          left: this.state.selectedFrame.files[filePath].left
        });

        return <img style={imageStyle} src={filePath}/>
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
