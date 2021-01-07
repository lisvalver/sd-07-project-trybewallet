import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class Routes extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <main>
        <Switch>
          <Route exact path="/">
            { loggedIn ? <Redirect to="/carteira" /> : <Login /> }
          </Route>
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </main>
    );
  }
}

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps)(Routes);
