import pkg from '../../package.json';

var defaultState = {
  version: pkg.version,
  fileOrder: [],
  selectedFile: null,
  selectedAnimation: null,
  selectedFrame: null,
  canvasHeight: 300,
  canvasWidth: 300,
  entities: {
    files: {},
    animations: {},
    frames: {}
  }
};

const defaultAnimation = {
  frames: []
};

const defaultFrame = {
  duration: 500,
  fileFrames: []
};

const defaultFileFrame = {
  top: 0,
  left: 0,
  rotation: 0,
  visible: true
};

export function file(state, action) {
  switch(action.type) {
    case 'RENAME_FILE':
      return {...state, ...{name: action.name}};
    default:
      return state;
  }
}

export function files(state = defaultState.entities.files, action) {
  switch(action.type) {
    case 'ADD_FILE':
      return {...state, ...{[action.id]: {id: action.id, name: action.fileName}}};
    case 'RENAME_FILE':
      return {...state, ...{[action.file]: file(state[action.file], action)}};
    default:
      return state;
  }
};

export function fileOrder(state, action) {
  switch(action.type) {
    case 'MOVE_FILE_UP':
      var originalIndex = state.indexOf(action.file);
      if (originalIndex > 0) {
        let newState = [...state];
        newState[originalIndex] = newState[originalIndex - 1];
        newState[originalIndex - 1] = action.file;
        return newState;
      }
      return state;
    case 'MOVE_FILE_DOWN':
      var originalIndex = state.indexOf(action.file);
      if (originalIndex < state.length - 1) {
        let newState = [...state];
        newState[originalIndex] = newState[originalIndex + 1];
        newState[originalIndex + 1] = action.file;
        return newState;
      }

      return state;
    case 'ADD_FILE':
      return [].concat(state, action.id);
    case 'IMPORT_STATE':
      return action.state.fileOrder;
    default:
      return state;
  }
};

export function animation(state, action) {
  switch (action.type) {
    case 'ADD_FRAME_TO_ANIMATION':
      return {...state, ...{frames: [].concat(state.frames, action.frame)}};
    case 'RENAME_ANIMATION':
      return {...state, ...{name: action.newName}};
    default:
      return state;
  }
};

function generateFileFrames(stateTree) {
  if (stateTree.selectedFrame !== null && stateTree.selectedFrame !== undefined) {
    return [].concat(stateTree.entities.frames[stateTree.selectedFrame].fileFrames);
  } else {
    return Object.keys(stateTree.entities.files).map(id => {
      return {...defaultFileFrame, ...{file: parseInt(id)}};
    });
  }
};

function frame(state, action, stateTree) {
  switch(action.type) {
    case 'ADD_EVENT_TO_FRAME':
      return {...state, ...{events: [].concat(state.events, action.event)}};
    case 'DELETE_EVENT_FROM_FRAME':
      return {
        ...state,
        ...{
          events: state.events.filter((event) => (event !== action.event))
        }
      }
    case 'SET_DURATION_FOR_FRAME':
      return {...state, ...{duration: action.duration}};
    case 'INCREMENT_LEFT_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{left: fileFrame.left + 1}};
          }
          return fileFrame;
        })
      };
    case 'INCREMENT_TOP_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{top: fileFrame.top + 1}};
          }
          return fileFrame;
        })
      };
    case 'DECREMENT_LEFT_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{left: fileFrame.left - 1}};
          }
          return fileFrame;
        })
      };
    case 'DECREMENT_TOP_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{top: fileFrame.top - 1}};
          }
          return fileFrame;
        })
      };
    case 'SET_LEFT_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{left: action.left}};
          }
          return fileFrame;
        })
      };
    case 'SET_TOP_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{top: action.top}};
          }
          return fileFrame;
        })
      };
    case 'ROTATE_LEFT_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{rotation: fileFrame.rotation - 1}};
          }
          return fileFrame;
        })
      };
    case 'ROTATE_RIGHT_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{rotation: fileFrame.rotation + 1}};
          }
          return fileFrame;
        })
      };
    case 'SET_ROTATION_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{rotation: action.rotation}};
          }
          return fileFrame;
        })
      };
    case 'SET_VISIBILITY_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        fileFrames: state.fileFrames.map(fileFrame => {
          if (fileFrame.file === stateTree.selectedFile) {
            return {...fileFrame, ...{visible: action.visible}};
          }
          return fileFrame;
        })
      };
    default:
      return state;
  }
}

export function frames(state, action, stateTree) {
  switch(action.type) {
    case 'ADD_FRAME_TO_ANIMATION':
      return {
        ...state,
        ...{
          [action.frame]: {
            id: action.frame,
            fileFrames: generateFileFrames(stateTree),
            duration: 500,
            events: []
          }
        }
      };
    case 'INCREMENT_LEFT_FOR_SELECTED_FILE_FRAME':
    case 'INCREMENT_TOP_FOR_SELECTED_FILE_FRAME':
    case 'DECREMENT_LEFT_FOR_SELECTED_FILE_FRAME':
    case 'DECREMENT_TOP_FOR_SELECTED_FILE_FRAME':
    case 'ROTATE_LEFT_FOR_SELECTED_FILE_FRAME':
    case 'ROTATE_RIGHT_FOR_SELECTED_FILE_FRAME':
    case 'SET_ROTATION_FOR_SELECTED_FILE_FRAME':
    case 'SET_LEFT_FOR_SELECTED_FILE_FRAME':
    case 'SET_TOP_FOR_SELECTED_FILE_FRAME':
    case 'SET_VISIBILITY_FOR_SELECTED_FILE_FRAME':
      return {
        ...state,
        ...{
          [stateTree.selectedFrame]: frame(state[stateTree.selectedFrame], action, stateTree)
        }
      };
    case 'DELETE_FRAME':
      let newState = {...state};
      delete newState[action.frame];
      return newState;
    case 'ADD_EVENT_TO_FRAME':
    case 'DELETE_EVENT_FROM_FRAME':
    case 'SET_DURATION_FOR_FRAME':
      return {
        ...state,
        ...{
          [action.frame]: frame(state[action.frame], action, stateTree)
        }
      };
    default:
      return state;
  }
}

export function animations(state = defaultState.entities.animations, action, stateTree) {
  switch(action.type) {
    case 'ADD_ANIMATION':
      return {...state, ...{[action.id]: {id: action.id, name: action.animationName, frames: []}}};
    case 'DELETE_FRAME':
      let foundAnimation = Object.keys(state).map(key => {return state[key]}).filter(animation => { return animation.frames.indexOf(action.frame) !== -1 })[0];
      return {
        ...state,
        ...{[foundAnimation.id]: {...foundAnimation, frames: foundAnimation.frames.filter(frameId => { return frameId !== action.frame})}}
      };
    case 'ADD_FRAME_TO_ANIMATION':
    case 'RENAME_ANIMATION':
      return {
        ...state,
        ...{[action.animation]: animation(state[action.animation], action)}
      };
    default:
      return state;
  }
};

export function entities(state = defaultState.entities, action, stateTree) {
  if (action.type === 'IMPORT_STATE') {
    return {...action.state.entities};
  }
  return {
    files: files(state.files, action, stateTree),
    animations: animations(state.animations, action, stateTree),
    frames: frames(state.frames, action, stateTree)
  };
};

export function selectedAnimation(state = null, action, stateTree) {
  switch(action.type) {
    case 'ADD_ANIMATION':
      return action.id;
    case 'SELECT_ANIMATION':
      return action.animation;
    case 'IMPORT_STATE':
      let animations = Object.keys(action.state.entities.animations);
      if (animations.length) {
        return action.state.entities.animations[animations[0]].id;
      }
      return state;
    default:
      return state;
  }
};

export function selectedFile(state = null, action, stateTree) {
  switch(action.type) {
    case 'ADD_FILE':
      return action.id;
    case 'SELECT_FILE':
      return action.file;
    case 'IMPORT_STATE':
      let files = Object.keys(action.state.entities.files);
      if (files.length) {
        return action.state.entities.files[files[0]].id;
      }
    default:
      return state;
  }
};

export function selectedFrame(state = null, action, stateTree) {
  switch(action.type) {
    case 'ADD_FRAME_TO_ANIMATION':
      return action.frame;
    case 'SELECT_FRAME':
      return action.frame;
    case 'DELETE_FRAME':
      if (stateTree.selectedAnimation !== null) {
        let frames = stateTree.entities.animations[stateTree.selectedAnimation].frames;
        let frameIndex = frames.indexOf(action.frame);
        if (frameIndex === 0) {
          return frames[1];
        } else {
          return frames[frameIndex - 1];
        }
      }
    case 'IMPORT_STATE':
      let animations = Object.keys(action.state.entities.animations);
      if (animations.length && action.state.entities.animations[animations[0]].frames.length) {
        return action.state.entities.animations[animations[0]].frames[0];
      }
    case 'SELECT_ANIMATION':
      if (stateTree.entities.animations[action.animation] && stateTree.entities.animations[action.animation].frames.length){
        return stateTree.entities.animations[action.animation].frames[0];
      }
    default:
      return state;
  }
};

export function canvasWidth(state, action) {
  switch(action.type) {
    case 'SET_CANVAS_WIDTH':
      return action.width;
    case 'IMPORT_STATE':
      return action.state.canvasWidth;
    default:
      return state;
  }
};

export function canvasHeight(state, action) {
  switch(action.type) {
    case 'SET_CANVAS_HEIGHT':
      return action.height;
    case 'IMPORT_STATE':
      return action.state.canvasHeight;
    default:
      return state;
  }
}

export function app(state = defaultState, action = {}) {
  return {
    version: pkg.version,
    canvasHeight: canvasHeight(state.canvasHeight, action),
    canvasWidth: canvasWidth(state.canvasWidth, action),
    selectedFile: selectedFile(state.selectedFile, action, state),
    selectedAnimation: selectedAnimation(state.selectedAnimation, action, state),
    selectedFrame: selectedFrame(state.selectedFrame, action, state),
    fileOrder: fileOrder(state.fileOrder, action, state),
    entities: entities(state.entities, action, state)
  };
};
