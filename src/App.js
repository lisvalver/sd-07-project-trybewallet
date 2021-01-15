import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Carteira from './pages/Wallet';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Carteira } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
