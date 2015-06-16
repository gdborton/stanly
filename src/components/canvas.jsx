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
        background: 'URL(assets/img/transparent-bg.png)'
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
        <div>
          Width: <input value={this.state.canvasWidth} onChange={this._handleWidthChange} />
        Height: <input value={this.state.canvasHeight} onChange={this._handleHeightChange} />
        </div>
      </div>
    );
  },

  _handleWidthChange: function(event) {
    canvasActions.setWidth(event.target.value);
  },

  _handleHeightChange: function() {
    canvasActions.setHeight(event.target.value);
  }
});

module.exports = Canvas;
