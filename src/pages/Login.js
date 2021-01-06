import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
    this.state = {
      email: '',
      password: '',
      disableButton: true,
    };
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.verifyInput());
  }

  //  https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  verifyInput() {
    const { email, password } = this.state;
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const num = 5;
    if (regEx.test(email) && password.length > num) {
      console.log('ksdjk');
      this.setState({
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  }

  render() {
    const { disableButton } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ disableButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
