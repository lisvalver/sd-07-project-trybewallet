import React from 'react';
import PropTypes from 'prop-types';
import { LoginForm } from '../Components';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <LoginForm history={ history } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Login;
