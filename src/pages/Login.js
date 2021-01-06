import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.validateInputs = this.validateInputs.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  validateInputs() {
    const { email, password } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minChars = 5;
    if (emailRegex.test(email) && password.length > minChars) {
      return false;
    }
    return true;
  }

  handleChangeInput(field, newValue) {
    this.setState({ [field]: newValue });
    this.validateInputs();
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        Login-Logo
        <input
          type="text"
          data-testid="email-input"
          placeholder="Insira seu email"
          value={ email }
          onChange={ (e) => this.handleChangeInput('email', e.target.value) }
        />

        <input
          type="password"
          data-testid="password-input"
          placeholder="senha"
          value={ password }
          onChange={ (e) => this.handleChangeInput('password', e.target.value) }
        />

        <button type="button" disabled={ this.validateInputs() }>Entrar</button>
      </div>
    );
  }
}

export default Login;
