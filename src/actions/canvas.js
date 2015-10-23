import events from'../constants/events';
import {dispatch} from '../stores/redux';

function setHeight(height) {
  return {
    type: events.SET_CANVAS_HEIGHT,
    height
  }
};

function setWidth(width) {
  return {
    type: events.SET_CANVAS_WIDTH,
    width
  }
};

var canvasActions = {
  setHeight(height) {
    dispatch(setHeight(parseInt(height)));
  },

  setWidth(width) {
    dispatch(setWidth(parseInt(width)));
  }
};

export default canvasActions;
