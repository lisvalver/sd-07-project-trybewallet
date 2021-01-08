import { createStore } from 'redux';
import reducerAll from '../reducers';

const store = createStore(
  reducerAll,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
