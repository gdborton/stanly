import React  from 'react';
import editorStore  from '../stores/editor';

var CanvasSettings = React.createClass({
  render() {
    return (
      <div>
        Width: <input value={this.props.width} onChange={this.props.onChangeWidth} />
        Height: <input value={this.props.height} onChange={this.props.onChangeHeight} />
      </div>
    );
  }
});

export default CanvasSettings;
