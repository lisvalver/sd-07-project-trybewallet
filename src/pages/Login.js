import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <article>
        <section>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            testid="email-input"
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
        <button>Entrar</button>
      </article>
    );
  }
}

export default Login;
