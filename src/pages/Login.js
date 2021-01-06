import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import login from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.validateLogin = this.validateLogin.bind(this);
  }

  validateLogin(email, password, minLength) {
    const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    const passwordIsValid = password.length >= minLength && password !== undefined;
    if ((emailIsValid && email !== 'undefined') && (passwordIsValid)) {
      return true;
    }
    return false;
  }

  render() {
    const { email, password } = this.state;
    const { login: actionLogin } = this.props;
    const minLength = 6;
    const isValid = this.validateLogin(email, password, minLength);
    return (
      <div>
        <input
          type="text"
          onChange={ (e) => this.setState({ email: e.target.value }) }
          placeholder="email"
          data-testid="email-input"
        />
        <input
          type="password"
          onChange={ (e) => this.setState({ password: e.target.value }) }
          placeholder="senha"
          data-testid="password-input"
        />
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => actionLogin({ email, password }) }
            data-testid="btn-login"
            disabled={ !isValid }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  login: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(login(e)),
});

export default connect(null, mapDispatchToProps)(Login);
