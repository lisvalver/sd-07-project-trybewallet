import { createStore } from 'redux';
import rootReducer from '../reducers';
// como é um arquivo chamado index.js não precisa colocar

const store = createStore(rootReducer);

export default store;
