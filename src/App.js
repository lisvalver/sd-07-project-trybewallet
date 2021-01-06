import React from 'react';
import { Router, Switch } from 'react-router-dom';

import Login from './pages/Login';

function App() {
  return (
    <div>
      <Switch>
        <Router exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
