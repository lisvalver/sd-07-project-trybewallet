import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { emailLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.verifyPass = this.verifyPass.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.currency = this.currency.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  verifyPass() {
    const { password } = this.state;
    const SIX = 6;
    const validatePassword = password.length >= SIX;
    return validatePassword;
  }

  verifyEmail() {
    const { email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const validate = regex.test(email);
    return validate;
  }

  verifyLogin() {
    const verifyEmail = this.verifyEmail();
    const verifyPassword = this.verifyPass();

    if (verifyEmail && verifyPassword) {
      return false;
    }
    return true;
  }

  currency(email) {
    const { sendEmail } = this.props;
    sendEmail(email);
  }

  render() {
    const { email } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            data-testid="email-input"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
            onChange={ (e) => this.setState({ password: e.target.value }) }
          />

          <Link to="/carteira">
            <button
              type="button"
              disabled={ this.verifyLogin() }
              onClick={ () => this.currency(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  send: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(emailLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
