import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Carteira from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Carteira } />
      </Switch>
    );
  }
}

export default App;
