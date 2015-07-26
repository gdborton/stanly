var React = require('react');
var frameStore = require('../stores/frames');
var globalStyles = require('../global-styles');
var frameActions = require('../actions/frames');

var styles = {
  container: {
    backgroundColor: globalStyles.colors.outsidePanelBackground,
    padding: globalStyles.sizes.containerPadding
  }
}

var Frames = React.createClass({
  getInitialState: function() {
    return {
      frames: frameStore.getFramesForSelectedAnimation(),
      isPlaying: frameStore.getIsPlaying(),
      selectedFrame: frameStore.getSelectedFrame()
    };
  },

  _updateFrameStoreState: function() {
    this.setState({
      frames: frameStore.getFramesForSelectedAnimation(),
      isPlaying: frameStore.getIsPlaying(),
      selectedFrame: frameStore.getSelectedFrame()
    });
  },

  componentDidMount: function() {
    frameStore.addChangeListener(this._updateFrameStoreState);
  },

  componentWillUnmount: function() {
    frameStore.removeChangeListener(this._updateFrameStoreState);
  },

  render: function() {
    var frames = this.state.frames.map(function(frame, index) {
      var style = {
        width: 10,
        height: 10,
        backgroundColor: frame === this.state.selectedFrame ? globalStyles.colors.selectedColor : 'white',
        border: '1px solid #ccc',
        display: 'inline-block'
      };
      return <div key={index} style={style} onClick={this.handleFrameClick.bind(this, frame)} />;
    }.bind(this));

    var frameDuration = 0;
    this.state.frames.forEach(function(frame) {
      frameDuration += parseInt(frame.duration);
    });
    frameDuration = frameDuration / 1000;

    return (
      <div style={styles.container}>
        Frames: {this.state.frames.length} Animation Duration: {frameDuration}s <a onClick={this.handleNewFrameClick} >+</a> <a onClick={this.handleTogglePlayClick}>{this.state.isPlaying ? 'PAUSE' : 'PLAY'}</a>
        <div>
          {frames}
        </div>
      </div>
    );
  },

  handleFrameClick: function(frame) {
    frameActions.selectFrame(frame);
  },

  handleNewFrameClick: function() {
    frameActions.addFrame();
  },

  handleTogglePlayClick: function() {
    frameActions.togglePlaying();
  }
});

module.exports = Frames;
