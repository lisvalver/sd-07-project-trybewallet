import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendEmail } from '../actions';
import TrybeWalletImage from '../images/trybe_small.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.validateEmail = this.validateEmail.bind(this);
    this.allowEmail = this.allowEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.allowPassword = this.allowPassword.bind(this);

    this.state = {
      emailValid: false,
      passValid: false,
      email: '',
    };
  }

  validateEmail(email) {
    const emailRegex = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;

    return emailRegex.test(email);
  }

  allowEmail({ target: { value } }) {
    const emailValid = this.validateEmail(value);

    this.setState({
      emailValid,
      email: value,
    });
  }

  validatePassword(password) {
    const passRegex = /^\w{6,}$/;

    return passRegex.test(password);
  }

  allowPassword({ target: { value } }) {
    const passValid = this.validatePassword(value);

    this.setState({
      passValid,
    });
  }

  render() {
    const { emailValid, passValid, email } = this.state;
    const { sendEmailFromProps } = this.props;

    return (
      <div>
        <form className="login-page">
          <section className="login-field">
            <img
              src={ TrybeWalletImage }
              alt="Trybe Wallet"
              className="trybe-logo"
            />
            <h1 className="login-title">Login</h1>
            <input
              id="email-input"
              type="email"
              data-testid="email-input"
              onChange={ this.allowEmail }
              required
              placeholder="Insira seu e-mail aqui..."
              className="login-input"
            />
            <input
              id="password-input"
              type="password"
              data-testid="password-input"
              onChange={ this.allowPassword }
              required
              placeholder="Insira sua senha aqui..."
              className="login-input"
            />
            <Link to="/carteira">
              <button
                type="button"
                onClick={ () => sendEmailFromProps(email) }
                disabled={ !(emailValid && passValid) }
                className="login-button"
              >
                Entrar
              </button>
            </Link>
          </section>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmailFromProps: (email) => dispatch(sendEmail(email)),
});

Login.propTypes = {
  sendEmailFromProps: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
