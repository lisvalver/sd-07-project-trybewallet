import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import store from './store';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Provider store={ store }>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Provider>
    </div>
  );
}

export default App;
