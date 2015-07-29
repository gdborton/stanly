import React from 'react';
import frameStore from '../stores/frames';
import globalStyles from '../global-styles';
import frameActions from '../actions/frames';

var styles = {
  container: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    padding: globalStyles.sizes.containerPadding
  }
}

var Frames = React.createClass({
  getInitialState() {
    return {
      frames: frameStore.getFramesForSelectedAnimation(),
      isPlaying: frameStore.getIsPlaying(),
      selectedFrame: frameStore.getSelectedFrame()
    };
  },

  _updateFrameStoreState() {
    this.setState({
      frames: frameStore.getFramesForSelectedAnimation(),
      isPlaying: frameStore.getIsPlaying(),
      selectedFrame: frameStore.getSelectedFrame()
    });
  },

  componentDidMount() {
    frameStore.addChangeListener(this._updateFrameStoreState);
  },

  componentWillUnmount() {
    frameStore.removeChangeListener(this._updateFrameStoreState);
  },

  render() {
    var frames = this.state.frames.map((frame, index) => {
      var style = {
        width: 10,
        height: 10,
        backgroundColor: frame === this.state.selectedFrame ? globalStyles.colors.selectedColor : 'white',
        border: '1px solid #ccc',
        display: 'inline-block'
      };
      return <div key={index} style={style} onClick={this.handleFrameClick.bind(this, frame)} />;
    });

    var frameDuration = 0;
    this.state.frames.forEach(frame => {
      frameDuration += parseInt(frame.duration);
    });

    frameDuration = frameDuration / 1000;

    return (
      <div style={styles.container}>
        Frames: {this.state.frames.length} Animation Duration: {frameDuration}s{' '}
        <a onClick={this.handleNewFrameClick} >+</a>{' '}
        <a onClick={this.handleDeleteFrameClick} >-</a>{' '}
        <a onClick={this.handleTogglePlayClick}>{this.state.isPlaying ? 'PAUSE' : 'PLAY'}</a>
        <div>
          {frames}
        </div>
      </div>
    );
  },

  handleFrameClick(frame) {
    frameActions.selectFrame(frame);
  },

  handleNewFrameClick() {
    frameActions.addFrame();
  },

  handleDeleteFrameClick() {
    frameActions.deleteFrame(this.state.selectedFrame);
  },

  handleTogglePlayClick() {
    frameActions.togglePlaying();
  }
});

export default Frames;
