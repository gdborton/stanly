import React from 'react';
import {render} from 'react-dom';
import { Provider, connect } from 'react-redux';
import reduxStore from '../stores/redux';
import CanvasPanel from './canvas-panel';
import FrameEditorPanel from './frame-editor-panel';
import RenameModal from './rename-modal';
import globalStyles from '../global-styles';
import LeftPanel from './left-panel';
import keyConstants from '../constants/keys';
import actionCreators from '../actions/action-creators';

var styles = {
  application: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    color: globalStyles.colors.textColor,
    display: 'flex'
  }
};

var Application = React.createClass({
  componentDidMount() {
    document.body.onkeydown = this._handleKeyUp;
  },

  render() {
    let selectedFrame = this.props.frames.filter((frame)=> (frame.id === this.props.selectedFrame))[0];
    let duration = selectedFrame.duration;
    let events = selectedFrame.events;
    return (
      <div style={styles.application}>
        <LeftPanel
          files={this.props.files} selectedFileId={this.props.selectedFile} onSelectFile={this.handleSelectFile} onRenameFile={this.handleRenameFile}
          animations={this.props.animations} selectedAnimation={this.props.selectedAnimation} onSelectAnimation={this.handleSelectAnimation} onAddAnimation={this.handleAddAnimation} onRenameAnimation={this.handleRenameAnimation}/>
        <CanvasPanel
          frames={this.props.framesForSelectedAnimation} selectedFrameId={this.props.selectedFrame}
          onAddFrame={this.handleAddFrame} onSelectFrame={this.handleSelectFrame} onDeleteFrame={this.handleDeleteFrame}
          canvasWidth={this.props.canvasWidth} canvasHeight={this.props.canvasHeight} onChangeCanvasWidth={this.handleChangeCanvasWidth} onChangeCanvasHeight={this.handleChangeCanvasHeight}/>

        <FrameEditorPanel
          top={this.props.selectedFileFrame.top} left={this.props.selectedFileFrame.left} rotation={this.props.selectedFileFrame.rotation}
          onChangeTop={this.handleChangeTop} onChangeLeft={this.handleChangeLeft} onChangeRotation={this.handleChangeRotation}
          visible={this.props.selectedFileFrame.visible} duration={duration}
          onChangeVisibility={this.handleChangeVisibility} onChangeDuration={this.handleChangeDuration}
          events={events} onAddEvent={this.handleAddEvent} onDeleteEvent={this.handleDeleteEvent}/>
        <RenameModal />
      </div>
    );
  },

  handleSelectFile(file) {
    this.props.dispatch(actionCreators.selectFile(file.id));
  },

  handleRenameFile(file, newName) {
    this.props.dispatch(actionCreators.renameFile(file.id, newName));
  },

  handleAddAnimation() {
    let newAnimationId = Math.max.call(null, this.props.animations.map((animation) => {
      return animation.id;
    })) + 1;
    this.props.dispatch(actionCreators.addAnimation('Untitled ' + newAnimationId, newAnimationId));
  },

  handleChangeCanvasHeight(event) {
    this.props.dispatch(actionCreators.setCanvasHeight(event.target.value));
  },

  handleChangeCanvasWidth(event) {
    this.props.dispatch(actionCreators.setCanvasWidth(event.target.value));
  },

  handleChangeTop(top) {
    this.props.dispatch(actionCreators.setTopForSelectedFileFrame(top));
  },

  handleChangeLeft(left) {
    this.props.dispatch(actionCreators.setLeftForSelectedFileFrame(left));
  },

  handleChangeRotation(rotation) {
    this.props.dispatch(actionCreators.setRotationForSelectedFileFrame(rotation));
  },

  handleChangeVisibility(visible) {
    this.props.dispatch(actionCreators.setVisibilityForSelectedFileFrame(visible));
  },

  handleChangeDuration(duration) {
    this.props.dispatch(actionCreators.setDurationForFrame(this.props.selectedFrame, duration));
  },

  handleSelectAnimation(animation) {
    this.props.dispatch(actionCreators.selectAnimation(animation.id));
  },

  handleRenameAnimation(animation, newName) {
    this.props.dispatch(actionCreators.renameAnimation(animation.id, newName));
  },

  handleAddFrame() {
    this.props.dispatch(actionCreators.addFrameToAnimation(this.props.selectedAnimation, this.props.frames.length));
  },

  handleSelectFrame(frame) {
    this.props.dispatch(actionCreators.selectFrame(frame.id));
  },

  handleDeleteFrame(frameId) {
    this.props.dispatch(actionCreators.deleteFrame(frameId));
  },

  handleAddEvent(event) {
    this.props.dispatch(actionCreators.addEventToFrame(event, this.props.selectedFrame));
  },

  handleDeleteEvent(event) {
    this.props.dispatch(actionCreators.deleteEventFromFrame(event, this.props.selectedFrame));
  },

  _handleKeyUp(event) {
    //console.log('key pressed', event.which);
    let dispatch = this.props.dispatch;
    var keyHandlers = {};
    keyHandlers[keyConstants.UP] = () => {
      return event.ctrlKey ? actionCreators.moveFileUp(this.props.selectedFile) : actionCreators.decrementTopForSelectedFileFrame();
    };

    keyHandlers[keyConstants.DOWN] = () => {
      return event.ctrlKey ? actionCreators.moveFileDown(this.props.selectedFile) : actionCreators.incrementTopForSelectedFileFrame();
    };

    keyHandlers[keyConstants.LEFT] = actionCreators.decrementLeftForSelectedFileFrame;
    keyHandlers[keyConstants.RIGHT] = actionCreators.incrementLeftForSelectedFileFrame;
    keyHandlers[keyConstants.PAGE_UP] = actionCreators.rotateSelectedFileFrameLeft;
    keyHandlers[keyConstants.PAGE_DOWN] = actionCreators.rotateSelectedFileFrameRight;

    var focus = document.querySelector(':focus');
    if ((!focus || focus.tagName !== 'INPUT') && keyHandlers[event.which]) {
      event.preventDefault();
      dispatch(keyHandlers[event.which]());
    }
  }
});

function entityHashToArray(entity) {
  return Object.keys(entity).map((entityId) => {
    return entity[entityId];
  });
}

Application = connect(function(state) {
  let returnValue = {
    selectedFile: state.selectedFile,
    selectedAnimation: state.selectedAnimation,
    selectedFrame: state.selectedFrame,
    canvasHeight: state.canvasHeight,
    canvasWidth: state.canvasWidth,
    files: entityHashToArray(state.entities.files).sort((fileA, fileB) => {
      return state.fileOrder.indexOf(fileA.id) - state.fileOrder.indexOf(fileB.id);
    }),
    frames: entityHashToArray(state.entities.frames),
    animations: entityHashToArray(state.entities.animations),
    framesForSelectedAnimation: state.entities.animations[state.selectedAnimation].frames.map((frameId) => {
      let frame = {...state.entities.frames[frameId]};
      frame.fileFrames = frame.fileFrames.sort((fileFrameA, fileFrameB) => {
        return state.fileOrder.indexOf(fileFrameA.file) - state.fileOrder.indexOf(fileFrameB.file);
      });

      frame.fileFrames = frame.fileFrames.map(function(fileFrame) {
        return {...fileFrame, ...{file: state.entities.files[fileFrame.file].name, fileId: fileFrame.file}};
      });
      return frame;
    })
  };

  returnValue.selectedFileFrame = returnValue.framesForSelectedAnimation.filter((frame)=> {
    return frame.id === returnValue.selectedFrame;
  }).map(function(frame) {
    return frame.fileFrames.filter((fileFrame) => {
      return fileFrame.fileId === state.selectedFile;
    })[0];
  })[0];
  return returnValue;
})(Application);

render(
  <Provider store={reduxStore}>
    <Application/>
  </Provider>,
  document.getElementById('render-target')
);

export default Application;
