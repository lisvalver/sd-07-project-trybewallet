import React from 'react';
//  import Redirect from 'react-router-dom';

class Login extends React.Component {
  /*  constructor(props) {
    super(props);
      this.handleClick = this.bind.handleClick(this);

    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
  }
  handleClick() {

  } */
  render() {
    return (
      <div>
        <form>
          <input type="email" data-testid="email-input" placeholder="alguem@alguem.com" />
          <input
            type="password"
            data-testid="password-input"
            pattern=".{6,}"
            required
            title="6 characters minimum"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
