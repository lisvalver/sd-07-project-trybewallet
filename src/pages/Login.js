import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validate: true,
    };
  }

  handleSubmit = () => {
    const { history } = this.props;
    history.push('/carteira');
  };

  handleChanger = ({ target: { name, value } }) => {
    this.setState({ [name]: value },  this.validadeEmail);
    this.validadeEmail();
  };
  validadeEmail() {
    const { email, password } = this.state;
    const number = 5;
    if (email.match(/\S+@\S+\.\S+/) && password.length > number) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  }
  render() {
    const { email, password, validate } = this.state;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          maxLength="40"
          fluid
          placeholder="Email"
          required
          value={email}
          name="email"
          onChange={(e) => this.handleChanger(e)}
        />
        <input
          type="text"
          data-testid="password-input"
          maxLength="50"
          fluid
          placeholder="password"
          value={password}
          name="password"
          onChange={(e) => this.handleChanger(e)}
        />

        <button value="Entrar" onClick={this.handleSubmit} disabled={validate}>
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
