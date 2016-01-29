import React from 'react';
import globalStyles from '../global-styles';
import Canvas from './canvas';
import CanvasSettings from './canvas-settings';
import Frames from './frames';

var borderStyle = '1px solid #181a1f';
var styles = {
  container: {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

  canvasContainer: {
    backgroundColor: globalStyles.colors.insidePanelBackground,
    border: borderStyle,
    flex: 1,
    overflow: 'auto'
  },

  canvasSettingsContainer: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    padding: globalStyles.sizes.containerPadding
  },

  framesContainer: {

  }
};

var CanvasPanel = React.createClass({
  render() {
    let selectedFrame = this.props.frames.filter((frame) => {
      return frame.id === this.props.selectedFrameId;
    })[0];
    return (
      <div style={styles.container}>
        <div style={styles.framesContainer}>
          <Frames frames={this.props.frames} selectedFrameId={this.props.selectedFrameId}
            onAddFrame={this.props.onAddFrame} onSelectFrame={this.props.onSelectFrame} onDeleteFrame={this.props.onDeleteFrame}/>
        </div>
        <div style={styles.canvasContainer}>
          <Canvas width={this.props.canvasWidth} height={this.props.canvasHeight} frame={selectedFrame}/>
        </div>
        <div style={styles.canvasSettingsContainer}>
          <CanvasSettings
            width={this.props.canvasWidth} onChangeWidth={this.props.onChangeCanvasWidth}
            height={this.props.canvasHeight} onChangeHeight={this.props.onChangeCanvasHeight}/>
        </div>
      </div>
    );
  }
});

export default CanvasPanel;
