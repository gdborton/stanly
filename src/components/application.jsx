import React from 'react';
import CanvasPanel from './canvas-panel';
import FrameEditorPanel from './frame-editor-panel';
import RenameModal from './rename-modal';
import globalStyles from '../global-styles';
import LeftPanel from './left-panel';
import keyConstants from '../constants/keys';
import frameActions from '../actions/frames';
import fileActions from '../actions/files';
import exportHandler from '../utils/export-handler';

exportHandler.attemptImport();

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
    return (
      <div style={styles.application}>
        <LeftPanel />
        <CanvasPanel />
        <FrameEditorPanel />
        <RenameModal />
      </div>
    );
  },

  _handleKeyUp(event) {
    //console.log('key pressed', event.which);
    var keyHandlers = {};
    keyHandlers[keyConstants.UP] = (event) => {
      event.ctrlKey ? fileActions.moveSelectedFileUp() : frameActions.decrementTop();
    };

    keyHandlers[keyConstants.DOWN] = () => {
      event.ctrlKey ? fileActions.moveSelectedFileDown() : frameActions.incrementTop();
    };

    keyHandlers[keyConstants.LEFT] = frameActions.decrementLeft;
    keyHandlers[keyConstants.RIGHT] = frameActions.incrementLeft;
    keyHandlers[keyConstants.PAGE_UP] = frameActions.rotateLeft;
    keyHandlers[keyConstants.PAGE_DOWN] = frameActions.rotateRight;

    var focus = document.querySelector(':focus');
    if ((!focus || focus.tagName !== 'INPUT') && keyHandlers[event.which]) {
      event.preventDefault();
      keyHandlers[event.which](event);
    }
  }
});

React.render(<Application/>, document.body);

export default Application;
