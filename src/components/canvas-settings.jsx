import React  from 'react';
import canvasStore  from '../stores/canvas';
import canvasActions  from '../actions/canvas';

var CanvasSettings = React.createClass({
  getInitialState() {
    return {
      canvasHeight: canvasStore.getHeight(),
      canvasWidth: canvasStore.getWidth()
    }
  },

  _updateCanvasStoreState() {
    this.setState({
      canvasHeight: canvasStore.getHeight(),
      canvasWidth: canvasStore.getWidth()
    });
  },

  componentDidMount() {
    canvasStore.addChangeListener(this._updateCanvasStoreState);
  },

  componentWillUnmount() {
    canvasStore.removeChangeListener(this._updateCanvasStoreState);
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
