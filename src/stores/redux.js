import {createStore} from 'redux';
import editorApp from '../reducers/reducers';

let store = createStore(editorApp);

export default store;
