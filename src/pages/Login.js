import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChangeInput = this.handleChangeInput.bind(this);

    this.state = {
      email: '',
      password: '',
    };

  }

  handleChangeInput(field, newValue) {
    this.setState({ [field]: newValue });
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

        <button type="button">Entrar</button>
      </div>
    );
  }
}

export default Login;
