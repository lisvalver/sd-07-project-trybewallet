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
    this.validateEmail = this.validateEmail.bind(this);
  }

  async handleChanger({ target: { name, value } }) {
    await this.setState({ [name]: value });
    this.validateEmail();
  }

  validateEmail() {
    const magicNumber = 5;
    const { email, password } = this.state;
    if (email.match(/\S+@\S+\.\S+/) && password.length > magicNumber) {
      return this.setState({ validate: false });
    }
    this.setState({ validate: true });
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
          placeholder="email"
          onChange={ (e) => this.handleChanger(e) }
        />
        <input
          data-testid="password-input"
          type="text"
          name="password"
          value={ password }
          placeholder="senha"
          onChange={ (e) => this.handleChanger(e) }
        />
        <Link to="/carteira">
          <input type="button" value="Entrar" disabled={ validate } />
        </Link>
      </div>
    );
  }
}

export default Login;
