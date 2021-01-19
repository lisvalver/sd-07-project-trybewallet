import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// import { composeWithDevTools } from 'redux-devtools-extension';

// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });
// const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
//   applyMiddleware(thunk),
//   // other store enhancers if any
// ));

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
