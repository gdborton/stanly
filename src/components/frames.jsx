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
    return {
      isPlaying: editorStore.getIsPlaying()
    };
  },

  _updateFrames() {
    this.setState({
      isPlaying: editorStore.getIsPlaying()
    });
  },

  componentDidMount() {
    editorStore.addChangeListener(this._updateFrames);
  },

  componentWillUnmount() {
    editorStore.removeChangeListener(this._updateFrames);
  },

  render() {
    console.log(this.props);
    var frames = this.props.frames.map((frame, index) => {
      var style = {
        width: 10,
        height: 10,
        backgroundColor: frame.id === this.props.selectedFrameId ? globalStyles.colors.selectedColor : 'white',
        border: '1px solid #ccc',
        display: 'inline-block'
      };
      return <div key={index} style={style} onClick={this.handleFrameClick.bind(this, frame)} />;
    });

    var frameDuration = 0;
    this.props.frames.forEach(frame => {
      frameDuration += parseInt(frame.duration);
    });

    frameDuration = frameDuration / 1000;

    return (
      <div style={styles.container}>
        Frames: {this.props.frames.length} Animation Duration: {frameDuration}s{' '}
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
    this.props.onSelectFrame(frame);
  },

  handleNewFrameClick() {
    this.props.onAddFrame();
  },

  handleDeleteFrameClick() {
    this.props.onDeleteFrame(this.props.selectedFrameId);
  },

  handleTogglePlayClick() {
    frameActions.togglePlaying();
  }
});

export default Frames;
