import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailValid: false,
      email: '',
    }
  }

  validateEmail = (email) => {
    const emailRegex = /^\w+[\W_]?\w*@[a-z]+.com(?:.br)?$/;
    
    return emailRegex.test(email);
  }

  validatePassword = (password) => {

  }

  setEmailToState = ({ target: { value } }) => {
    const emailValid = this.validateEmail(value);

    this.setState({
      email: value,
      emailValid,
    })
  }

  render() {
    const { emailValid } = this.state;

    return (
      <article>
        <section>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            testid="email-input"
            onChange={ this.setEmailToState }
            required
          />
        </section>
        <section>
          <label htmlFor="password-input">Senha</label>
          <input
            id="password-input"
            type="password"
            data-testid="password-input"
            required
          />
        </section>
        <button disabled={ !emailValid }>Entrar</button>
      </article>
    );
  }
}

export default Login;
