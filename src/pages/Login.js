import React from "react";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
    }
  }
  render() {
    const {disabled} = this.state;
    return (
      <div>
        <form className="form">
          <h3>TRYBE WALLET</h3>
          <input
            type="text"
            data-testid="email-input"
            className="input-login"
            placeholder="insira aqui o seu e-mail"
          />
          <input
            type="password"
            data-testid="password-input"
            className="input-login"
            placeholder="insira aqui a sua senha"
          />
          <button className="button-login" disabled={disabled}>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
