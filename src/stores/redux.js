import {createStore, applyMiddleware} from 'redux';
import {app} from '../reducers/reducers';

const store = createStore(app);

export default store;
