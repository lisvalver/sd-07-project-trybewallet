import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label>
            Email
            <input type="text" data-testid="email-input" />
          </label>
          <label>
            Senha
            <input type="text" data-testid="email-input" />
          </label>
          <button type="submit"> Entrar </button>
        </form>
      </div>
    );
  }
}

export default Login;
