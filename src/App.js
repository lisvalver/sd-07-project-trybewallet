import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Wallet } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/"><Login /></Route>
      <Route exact path="/carteira"><Wallet /></Route>
    </Switch>
  );
}

export default App;
