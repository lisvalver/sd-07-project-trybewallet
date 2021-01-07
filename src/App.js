import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import GlobalStyles from './GrobalStyles';

class App extends React.Component {
  render() {
    return (
      <>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/carteira" exact component={ Wallet } />
        </Switch>
      </>
    );
  }
}

export default App;
