import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import login from '../actions';
import '../style/Login.css';

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
    const { actionLogin } = this.props;
    const minLength = 6;
    const isValid = this.validateLogin(email, password, minLength);
    return (
      <div className="container">
        <div className="form-container">
          <input
            type="text"
            className="input-login"
            onChange={ (e) => this.setState({ email: e.target.value }) }
            placeholder="email"
            data-testid="email-input"
          />
          <input
            type="password"
            className="input-login"
            onChange={ (e) => this.setState({ password: e.target.value }) }
            placeholder="senha"
            data-testid="password-input"
          />
          <button
            type="button"
            className="btn-login"
            onClick={ () => actionLogin({ email, password }) }
            data-testid="btn-login"
            disabled={ !isValid }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  actionLogin: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actionLogin: (e) => dispatch(login(e)),
});

export default connect(null, mapDispatchToProps)(Login);
