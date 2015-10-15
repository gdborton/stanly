import React  from 'react';
import editorStore  from '../stores/editor';
import canvasActions  from '../actions/canvas';

var CanvasSettings = React.createClass({
  getInitialState() {
    return {
      canvasHeight: editorStore.getHeight(),
      canvasWidth: editorStore.getWidth()
    }
  },

  _updateCanvas() {
    this.setState({
      canvasHeight: editorStore.getHeight(),
      canvasWidth: editorStore.getWidth()
    });
  },

  componentDidMount() {
    editorStore.addChangeListener(this._updateCanvas);
  },

  componentWillUnmount() {
    editorStore.removeChangeListener(this._updateCanvas);
  },

  render() {
    return (
      <div>
        Width: <input value={this.state.canvasWidth} onChange={this._handleWidthChange} />
        Height: <input value={this.state.canvasHeight} onChange={this._handleHeightChange} />
      </div>
    );
  },

  _handleWidthChange(event) {
    canvasActions.setWidth(event.target.value);
  },

  _handleHeightChange() {
    canvasActions.setHeight(event.target.value);
  }
});

export default CanvasSettings;
