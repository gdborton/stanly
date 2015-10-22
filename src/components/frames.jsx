import React from 'react';
import editorStore from '../stores/editor';
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
    var x = editorStore;
    console.log(editorStore.getFramesForSelectedAnimation());
    console.log(editorStore);
    return {
      frames: editorStore.getFramesForSelectedAnimation(),
      isPlaying: editorStore.getIsPlaying(),
      selectedFrame: editorStore.getSelectedFrame()
    };
  },

  _updateFrames() {
    this.setState({
      frames: editorStore.getFramesForSelectedAnimation(),
      isPlaying: editorStore.getIsPlaying(),
      selectedFrame: editorStore.getSelectedFrame()
    });
  },

  componentDidMount() {
    editorStore.addChangeListener(this._updateFrames);
  },

  componentWillUnmount() {
    editorStore.removeChangeListener(this._updateFrames);
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
