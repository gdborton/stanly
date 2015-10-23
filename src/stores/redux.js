import {createStore, applyMiddleware} from 'redux';
import editorApp from '../reducers/reducers';
import reduxImmutable from 'redux-immutable-state-invariant';

const createStoreWithMiddleware = applyMiddleware(reduxImmutable())(createStore);
const store = createStoreWithMiddleware(editorApp);

export default store;
