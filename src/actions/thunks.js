import actionCreators from './action-creators';
import fs from 'fs';
import config from '../constants/config';

export default {
  saveState() {
    return (dispatch, getState) => {
      let state = getState();
      fs.writeFile(process.cwd() + '/' + config.exportFile, 'module.exports = ' + JSON.stringify(state, null, 2) + ';');
    };
  }
};
