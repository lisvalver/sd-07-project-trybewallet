import React from 'react';

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label>
            <input
              type="text"
              placeholder="Email"
              data-testid="email-input"
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              data-testid="password-input"
            />
          </label>
          <button>Entrar</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;