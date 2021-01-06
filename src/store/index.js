import { createStore } from 'redux';
import reducerAll from '../reducers';

const store = createStore(reducerAll);

export default store;
