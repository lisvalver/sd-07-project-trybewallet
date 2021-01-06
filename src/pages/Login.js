import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);

    this.state = {
      email: '',
      password: '',
      emailVerified: false,
      passwordVerified: false,
    };
  }

  updateEmailValue({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });

    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    value.match(emailRegex)
      ? this.setState({ emailVerified: true })
      : this.setState({ emailVerified: false });
  }

  updatePasswordValue({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });

    value.length >= 6
      ? this.setState({ passwordVerified: true})
      : this.setState({passwordVerified: false})
  }

  render() {
    const {
      emailValue,
      passwordValue,
      passwordVerified,
      emailVerified,
    } = this.state;

    const validatedInputs = passwordVerified && emailVerified;

    return (
      <fieldset>
        <legend>Login</legend>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="exemplo@email.com"
          data-testid="email-input"
          value={ emailValue }
          onChange={ this.updateEmailValue }
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="minimo 6 dígitos"
          data-testid="password-input"
          value={ passwordValue }
          onChange={ this.updatePasswordValue }
        />
        <Link to="/carteira">
          <button disabled={ !validatedInputs }>Entrar</button>
        </Link>
      </fieldset>
    );
  }
}

export default Login;
