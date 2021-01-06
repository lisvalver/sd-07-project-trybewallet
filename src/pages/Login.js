import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);

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

  buttonEnabled() {
    return <button type="button">Entrar</button>;
  }

  render() {
    const { email, password } = this.state;

    // prettier-ignore
    return (
      <div className="App">
        Login - Trybe Wallets
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

export default Login;
