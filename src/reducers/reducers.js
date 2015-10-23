import eventConstants from '../constants/events';

const initialState = {
  height: 300,
  width: 300
};

function editorApp(state = initialState, action) {
  switch(action.type) {
    case eventConstants.SET_CANVAS_HEIGHT:
      return {...state, ...{height: action.height}};
    case eventConstants.SET_CANVAS_WIDTH:
      return {...state, ...{width: action.width}};
    default:
      return state;
  }
  return state;
};

export default editorApp;
