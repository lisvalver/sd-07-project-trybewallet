import React from 'react';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      Hello, TrybeWallet!
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route path="/wallet"><Wallet /></Route>
      </Switch>
    </div>
  );
}

export default App;
