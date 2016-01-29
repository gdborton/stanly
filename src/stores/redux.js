import {createStore, applyMiddleware} from 'redux';
import {app} from '../reducers/reducers';
import actionCreators from '../actions/action-creators';
import config from '../constants/config';
import fs from 'fs';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(app);
const files = fs.readdirSync(process.cwd());

if (files.indexOf(config.exportFile) !== -1) {
  let importedState = require(process.cwd() + '/' + config.exportFile);
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
