import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userLogin from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
      buttonStatus: true,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.validPassword = this.validPassword.bind(this);
    this.login = this.login.bind(this);
  }

  enableButton() {
    const { validEmail, validPassword } = this.state;
    if (validEmail && validPassword) {
      return this.setState({
        buttonStatus: false,
      });
    }
    return this.setState({
      buttonStatus: true,
    });
  }

  validEmail() {
    const { email } = this.state;
    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/.test(email);
    if (valid) {
      return this.setState({
        validEmail: true,
      }, this.enableButton);
    }
    return this.setState({
      validEmail: false,
    }, this.enableButton);
  }

  validPassword() {
    const { password } = this.state;
    const minLenght = 6;
    if (password.length >= minLenght) {
      return this.setState({
        validPassword: true,
      }, this.enableButton);
    }
    return this.setState({
      validPassword: false,
    }, this.enableButton);
  }

  handleEmail({ target: { value } }) {
    this.setState({
      email: value,
    }, this.validEmail);
  }

  handlePassword({ target: { value } }) {
    this.setState({
      password: value,
    }, this.validPassword);
  }

  login(email) {
    const { history, addUser } = this.props;
    addUser(email);
    history.push('/carteira');
  }

  render() {
    const { buttonStatus, email } = this.state;
    return (
      <div className="login-page">
        <form className="login-field">
          <h1 className="login-title">Login</h1>
          <input
            data-testid="email-input"
            type="email"
            onChange={ this.handleEmail }
            placeholder="Insira seu email..."
            className="login-input"
            required
          />
          <input
            data-testid="password-input"
            type="password"
            onChange={ this.handlePassword }
            placeholder="Insira sua senha..."
            className="login-input"
            minLength="6"
            required
          />
          <button
            id="login-button"
            type="button"
            disabled={ buttonStatus }
            onClick={ () => this.login(email) }
            className="login-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
