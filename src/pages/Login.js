import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.sendAccessData = this.sendAccessData.bind(this);
    this.checkLoginData = this.checkLoginData.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  sendAccessData({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  checkLoginData() {
    const { email, password } = this.state;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = regexEmail.test(email);
    const passwordMinimumLengthRequired = 6;
    const validatePassword = password.length > passwordMinimumLengthRequired;
    if (validateEmail && validatePassword) {
      return false;
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>TRYBE WALLET</h1>
        <form id="loginForm">
          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              id="email"
              name="email"
              value={ email }
              data-testid="email-input"
              autoComplete="on"
              onChange={ this.sendAccessData }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              data-testid="password-input"
              autoComplete="on"
              onChange={ this.sendAccessData }
            />
          </label>
          <button
            type="submit"
            name="Entrar"
            data-testid="login-submit-btn"
            disabled={ this.checkLoginData }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
