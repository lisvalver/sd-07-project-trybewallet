import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Login, Wallet } from './pages';
import store from './store/store';
import './App.css';

const App = () => (
  <Provider store={ store }>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  </Provider>
);

export default App;
