import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Wallet from './pages/Wallet';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
