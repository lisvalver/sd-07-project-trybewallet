import React from 'react';
import { Link } from 'react-router-dom'

class Login extends React.Component {
  render() {
    return (
      <div>
        <input
          data-testid="email-input"
          placeholder="e-mail"
        >
          {}
        </input>
        <input
          data-testid="password-input"
          placeholder="senha"
        >
          {}
        </input>
        <Link to="/carteira" ><button>Entrar</button></Link>
      </div>
    );
  }
}

export default Login;
