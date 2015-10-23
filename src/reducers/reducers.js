import eventConstants from '../constants/events';

const initialState = {
  selections: {
    selectedFile: null,
    selectedAnimation: null,
    selectedFrame: null
  },
  exportValues: {
    height: 300,
    width: 300,
    files: [],
    animations: {}
  }
};

const defaultFileFrame = {
  top: 0,
  left: 0,
  rotation: 0,
  visible: true
};

const defaultAnimation = {
  duration: 500,
  files: {}
};

function exportValues (state, action) {
  switch (action.type) {
    case eventConstants.SET_CANVAS_HEIGHT:
      return {...state, ...{ height: action.height }};
    case eventConstants.SET_CANVAS_WIDTH:
      return {...state, ...{ width: action.width }};
    case eventConstants.ADD_FILE:
      return {...state, ...addFile(state, action)};
    case eventConstants.ADD_ANIMATION:
      return {...state, ...addAnimation(state, action)};
    default:
      return state;
  }
}

function addAnimation(state, action) {
  var newState = JSON.parse(JSON.stringify(state));
  var animation = action.animationName ? action.animationName : 'Untitled ' + Object.keys(state.animations).length;
  newState.animations[animation] = [];
  return newState;
}

function addFile(state, action) {
  const files = [...state.files, action.fileName];
  let animations = JSON.parse(JSON.stringify(state.animations));

  Object.keys(animations).forEach(animation => {
    let frames = animations[animation]
    if (!frames.length) {
      animations[animation].push({...defaultAnimation})
    };

    frames.map(frame => {
      let newFrame = {...frame};
      newFrame.files[files.length - 1] = {...defaultFileFrame};
      return newFrame;
    });
  });

  return {files, animations};
};

function renameFile(state, action) {
  let selections = {...state.selections};
  let files = [...state.exportValues.files];
  try {
    fs.renameSync('./'+ action.oldName, './' + action.newName);
    if (action.oldName === selections.selectedFile) {
      selections.selectedFile = action.newName;
    }
    let index = files.indexOf(action.oldName);
    files[index] = action.newName;
  } catch (exception) {}
  let newState = {...state, ...{selections}};
  newState.exportValues.files = [...files];

  return newState;
};

function selections(state, action) {
  switch(action.type) {
    case eventConstants.SELECT_FILE_BY_NAME:
      return {...state, ...{selectedFile: action.fileName}};
    default:
      return state;
  }
};

// will be given an animation hash. Each field on the animation hash is an array of frames.
function swapFrameFileLocations(state, oldIndex, newIndex) {
  let newState = JSON.parse(JSON.stringify(state));
  Object.keys(newState).forEach((animation) => {
    newState[animation].forEach((frame) => {
      var firstValue = frame.files[oldIndex];
      frame.files[oldIndex] = frame.files[newIndex];
      frame.files[newIndex] = firstValue;
    });
  });
  return newState;
};

function moveSelectedFileUp(state, action) {
  let newState = JSON.parse(JSON.stringify(state));
  let files = newState.exportValues.files;
  let fileIndex = files.indexOf(state.selections.selectedFile);
  if (fileIndex !== 0) {
    files[fileIndex] = files[fileIndex + 1];
    files[fileIndex + 1] = newState.selections.selectedFile;
    newState.exportValues.animations = swapFrameFileLocations(newState.exportValues.animations, fileIndex, fileIndex + 1);
    return newState;
  }
  return {...state};
};

function moveSelectedFileDown(state, action) {
  let newState = JSON.parse(JSON.stringify(state));
  let files = newState.exportValues.files;
  let fileIndex = files.indexOf(state.selections.selectedFile);
  if (fileIndex !== 0) {
    files[fileIndex] = files[fileIndex + 1];
    files[fileIndex + 1] = newState.selections.selectedFile;
    newState.exportValues.animations = swapFrameFileLocations(newState.exportValues.animations, fileIndex, fileIndex + 1);
    return newState;
  }
  return {...state};
};

function editorApp(state = initialState, action) {
  let deepFreeze = require('deep-freeze');
  deepFreeze(state);
  switch(action.type) {
    case eventConstants.RENAME_FILE:
      return {...state, ...renameFile(state, action)};
    case eventConstants.MOVE_SELECTED_FILE_UP:
      return {...state, ...moveSelectedFileUp(state, action)};
    case eventConstants.MOVE_SELECTED_FILE_DOWN:
      return {...state, ...moveSelectedFileDOWN(state, action)};
    case eventConstants.SELECT_ANIMATION:
      return {
        ...state,
        ...{
          selections: {
            selectedAnimation: action.animationName,
            selectedFrame: state.exportValues.animations[action.animationName][0]
          }
        }
      };
    case eventConstants.SELECT_FILE_BY_NAME:
      return {...state, ...{selections: selections(state.selections, action)}};
    case eventConstants.SET_CANVAS_HEIGHT:
    case eventConstants.SET_CANVAS_WIDTH:
    case eventConstants.ADD_FILE:
    case eventConstants.ADD_ANIMATION:
      return {...state, ...{exportValues: exportValues(state.exportValues, action)}};
    case eventConstants.RESET:
      return {...initialState};
    default:
      return state;
  }
};

export default editorApp;
