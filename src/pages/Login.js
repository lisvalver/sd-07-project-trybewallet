import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validpassword: false,
    };
  }

  /*  validatePasswords(password) => {
    return password.length >= 6;
  };

  validateEmail(email) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return RegExp(pattern).test(email)
  } */
  render() {
    return (
      <form>
        <label htmlFor="email">
          <input data-testid="email-input" id="email" type="email" id="email" />
        </label>
        <label htmlFor="password">
          <input data-testid="password-input" id="password" type="password" id="password" />
        </label>
        <button>Entrar</button>
      </form>
    );
  }
}

export default Login;
