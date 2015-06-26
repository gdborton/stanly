var React = require('react');
var canvasStore = require('../stores/canvas');
var canvasActions = require('../actions/canvas');

var CanvasSettings = React.createClass({
  getInitialState: function() {
    return {
      canvasHeight: canvasStore.getHeight(),
      canvasWidth: canvasStore.getWidth()
    }
  },

  _updateCanvasStoreState: function() {
    this.setState({
      canvasHeight: canvasStore.getHeight(),
      canvasWidth: canvasStore.getWidth()
    });
  },

  componentDidMount: function() {
    canvasStore.addChangeListener(this._updateCanvasStoreState);
  },

  componentWillUnmount: function() {
    canvasStore.removeChangeListener(this._updateCanvasStoreState);
  },

  render: function() {
    return (
      <div>
        Width: <input value={this.state.canvasWidth} onChange={this._handleWidthChange} />
        Height: <input value={this.state.canvasHeight} onChange={this._handleHeightChange} />
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

module.exports = CanvasSettings;
