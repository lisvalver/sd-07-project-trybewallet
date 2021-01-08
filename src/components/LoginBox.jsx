import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginBox extends Component {
  constructor() {
    super();
    this.state = {
      emailValid: false,
    };
  }

  componentDidUpdate(prevProps) {
    this.emailValidation(prevProps);
  }

  emailValidate(email, password) {
    const emailValidate = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const passwordMinLength = 6;
    const validPassword = password.length >= passwordMinLength;
    const validEmail = emailValidate.test(email);
    return (validPassword && validEmail);
  }

  emailValidation({ password: prevP, email: prevE }) {
    const { password, email } = this.props;
    const { emailValid } = this.state;
    if (prevE !== email || prevP !== password) {
      if (this.emailValidate(email, password)) {
        this.setState({ emailValid: true });
      } else if (emailValid === true) {
        this.setState({ emailValid: false });
      }
    }
  }

  render() {
    const { getInputs, onSubmitBtn } = this.props;
    const { emailValid } = this.state;
    return (
      <div>
        <h3>Login</h3>
        <div>
          <label htmlFor="email-input">
            Email:
            <input
              data-testid="email-input"
              type="email"
              onChange={ getInputs }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              onChange={ getInputs }
            />
          </label>
          {
            emailValid
              ? <button type="submit" onClick={ onSubmitBtn }>Entrar</button>
              : <button type="submit" disabled>Entrar</button>
          }
        </div>
      </div>
    );
  }
}

LoginBox.propTypes = {
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getInputs: PropTypes.func.isRequired,
  onSubmitBtn: PropTypes.func.isRequired,
};
