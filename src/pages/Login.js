import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailValid: false,
      passValid: false,
    }
  }

  validateEmail = (email) => {
    const emailRegex = /^\w+[\W_]?\w*@[a-z]+.com(?:.br)?$/;
    
    return emailRegex.test(email);
  }

  allowEmail = ({ target: { value } }) => {
    const emailValid = this.validateEmail(value);

    this.setState({
      emailValid,
    })
  }

  validatePassword = (password) => {
    const passRegex = /^[\Wa-zA-z]{6,}$/
    console.log(passRegex.test(password));

    return passRegex.test(password);
  }

  allowPassword = ({ target: { value } }) => {
    const passValid = this.validatePassword(value);

    this.setState({
      passValid,
    })
  }

  render() {
    const { emailValid, passValid } = this.state;

    return (
      <article>
        <section>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            testid="email-input"
            onChange={ this.allowEmail }
            required
          />
        </section>
        <section>
          <label htmlFor="password-input">Senha</label>
          <input
            id="password-input"
            type="password"
            data-testid="password-input"
            onChange={ this.allowPassword }
            required
          />
        </section>
        <button disabled={ !(emailValid && passValid) }>Entrar</button>
      </article>
    );
  }
}

export default Login;
