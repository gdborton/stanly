import {createStore, applyMiddleware} from 'redux';
import {app} from '../reducers/reducers';
import actionCreators from '../actions/action-creators';
import fs from 'fs';

const exportFile = 'spriteconfig.js';
const store = createStore(app);
const files = fs.readdirSync(process.cwd());

if (files.indexOf(exportFile) !== -1) {
  let importedState = JSON.parse(fs.readFile(process.cwd() + '/' + exportFile));
  store.dispatch(actionCreators.importState(importedState));
} else {
  let filesThatNeedAdded = files.filter(file => {
    return /.*\.(png|jpg|jpeg|bmp)/.test(file);
  });
  filesThatNeedAdded.forEach((file, index) => {
    store.dispatch(actionCreators.addFile(file, index));
  });
  store.dispatch(actionCreators.addAnimation('Base', 0));
  store.dispatch(actionCreators.addFrameToAnimation(0, 0));
}

export default store;
