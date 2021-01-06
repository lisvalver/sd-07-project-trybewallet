import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/Login';

function App() {
  return (
    <div>
        <Provider store={store}>
          <Route exact path="/" component={ Login } />
        </Provider>
      </div>
  );
}

export default App;
