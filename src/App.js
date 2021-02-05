import React from 'react';
import { Switch, Router } from 'react-router-dom';

import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Router exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
