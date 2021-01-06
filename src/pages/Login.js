import React from 'react';
import { withRouter } from 'react-router-dom';

function validateEmail() {
  const email = document.getElementById('email-input');
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email.value);
}

function validatePassword() {
  const password = document.getElementById('password-input');
  const maxLength = 6;
  if (password.value.length >= maxLength) return true;
  return false;
}

const Button = withRouter(({ history }) => (
  <button
    type="button"
    onClick={ () => {
      if (validateEmail() && validatePassword()) {
        return history.push('/carteira');
      }
      console.log('email ou senha incorretos!');
    } }
  >
    Entrar
  </button>
));

class Login extends React.Component {
  render() {
    return (
      <div>
        <h3>Login</h3>
        <form>
          <input
            type="text"
            data-testid="email-input"
            id="email-input"
            placeholder="Enter your email"
          />
          <br />
          <input
            type="password"
            data-testid="password-input"
            id="password-input"
            placeholder="Enter your password"
          />
          <br />
          <Button />
        </form>
      </div>
    );
  }
}

export default Login;
