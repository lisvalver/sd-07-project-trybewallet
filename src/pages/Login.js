import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validate: true,
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate() {
    const { email, password } = this.state;
    const minNumber = 5;
    if (email.match(/\S+@\S+\.\S+/) && password.length > minNumber) {
      return this.setState({ validate: false });
    }
    this.setState({ validate: true });
  }

  async handleChanger({ target: { name, value } }) {
    await this.setState({ [name]: value });
    this.validate();
  }

  render() {
    const { email, password, validate } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ (event) => this.handleChanger(event) }
        />
        <input
          data-testid="password-input"
          type="text"
          name="password"
          value={ password }
          onChange={ (event) => this.handleChanger(event) }
        />
        <Link to="carteira">
          <input
            type="button"
            value="Entrar"
            disabled={ validate }
          />
        </Link>
      </div>);
  }
}

export default Login;
