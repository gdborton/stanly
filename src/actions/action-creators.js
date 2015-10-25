const actionCreators = {
  // canvas
  setCanvasHeight: (height) => ({ type: 'SET_CANVAS_HEIGHT', height: parseInt(height) }),
  setCanvasWidth: (width) => ({ type: 'SET_CANVAS_WIDTH', width: parseInt(width) }),

  // Files
  addFile: (fileName, id) => ({ type: 'ADD_FILE', fileName, id }),
  selectFile: (file) => ({ type: 'SELECT_FILE', file }),
  renameFile: (file, name) => ({ type: 'RENAME_FILE', file, name }),
  moveFileUp: (file) => ({type: 'MOVE_FILE_UP', file}),
  moveFileDown: (file) => ({type: 'MOVE_FILE_DOWN', file}),

  // animations
  addAnimation: (animationName, id) => ({type: 'ADD_ANIMATION', id, animationName}),
  renameAnimation: (animation, newName) => ({type: 'RENAME_ANIMATION', animation, newName}),
  selectAnimation: (animation) => ({type: 'SELECT_ANIMATION', animation}),

  // frames
  addFrameToAnimation: (animation, frame) => ({type: 'ADD_FRAME_TO_ANIMATION', animation, frame}),
  deleteFrame: (frame) => ({type: 'DELETE_FRAME', frame}),
  selectFrame: (frame) => ({type: 'SELECT_FRAME', frame}),
  setDurationForFrame: (frame, duration) => ({ type: 'SET_DURATION_FOR_FRAME', frame, duration }),

  // fileFrames
  decrementLeftForSelectedFileFrame: () => ({type: 'DECREMENT_LEFT_FOR_SELECTED_FILE_FRAME'}),
  incrementLeftForSelectedFileFrame: () => ({type: 'INCREMENT_LEFT_FOR_SELECTED_FILE_FRAME'}),
  setLeftForSelectedFileFrame: (left) => ({type: 'SET_LEFT_FOR_SELECTED_FILE_FRAME', left}),
  decrementTopForSelectedFileFrame: () => ({type: 'DECREMENT_TOP_FOR_SELECTED_FILE_FRAME'}),
  incrementTopForSelectedFileFrame: () => ({type: 'INCREMENT_TOP_FOR_SELECTED_FILE_FRAME'}),
  setTopForSelectedFileFrame: (top) => ({type: 'SET_TOP_FOR_SELECTED_FILE_FRAME', top}),
  setVisibilityForSelectedFileFrame: (visible) => ({type: 'SET_VISIBILITY_FOR_SELECTED_FILE_FRAME', visible}),
  rotateSelectedFileFrameLeft: () => ({type: 'ROTATE_LEFT_FOR_SELECTED_FILE_FRAME'}),
  rotateSelectedFileFrameRight: () => ({type: 'ROTATE_RIGHT_FOR_SELECTED_FILE_FRAME'}),
  setRotationForSelectedFileFrame: (rotation) => ({type: 'SET_ROTATION_FOR_SELECTED_FILE_FRAME', rotation})
};


export default actionCreators;
