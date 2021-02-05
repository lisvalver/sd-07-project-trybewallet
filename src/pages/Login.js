import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      redirect: false,
      disabled: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleClick.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  handleClick() {
    const { saveEmail } = this.props;
    const { email } = this.email;
    this.setState({ redirect: true });
    saveEmail(email);
  }

  checkInputs() {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const { email, password } = this.state;

  }

  handleChange({ target: { name, value}}) {
    this.setState({ [name]: value}, () => {
      const validInputs = checkInputs();
      this.setState({disabled: !validInputs});
    });
  }
  render() {
    const { email, password, disabled, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="e-mail"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="senha"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = { saveEmail }

export default connect(null, mapDispatchToProps)(Login);