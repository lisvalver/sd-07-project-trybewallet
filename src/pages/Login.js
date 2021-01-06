import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as signAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  verifyEmailAndPassword() {
    const { email, password } = this.state;

    const regexEmail = new RegExp('.+@[A-z]+[.]com');
    const regexPassword = new RegExp('.{6}');

    if (regexEmail.test(email) && regexPassword.test(password)) {
      return true;
    }
  }

  buttonDisabled() {
    return (
      <button type="button" disabled="disabled">
        Entrar
      </button>
    );
  }

  // prettier-ignore
  buttonEnabled() {
    return (
      <button type="button" onClick={ this.handleClick }>
        Entrar
      </button>
    );
  }

  handleClick() {
    const { email } = this.state;
    const { signIn, history } = this.props;
    signIn(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;

    // prettier-ignore
    return (
      <div className="App">
        Login - Trybe Wallet
        <form>
          <input
            data-testid="email-input"
            type="email"
            placeholder="E-mail"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <br />
          <input
            data-testid="password-input"
            type="password"
            placeholder="Password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <br />
          {this.verifyEmailAndPassword() ? this.buttonEnabled() : this.buttonDisabled()}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = {
  signIn: signAction.signIn,
};

export default connect(null, mapDispatchToProps)(Login);
