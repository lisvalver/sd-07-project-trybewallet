import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  validateInputs() {
    const { email, password } = this.state;
    let validPassword;
    const minLength = 6;
    const validEmail = email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    if (password.length >= minLength) {
      validPassword = true;
    }
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const disabled = this.validateInputs();
      this.setState({ disabled });
    });
  }

  handleClick() {
    const { email } = this.state;
    this.setState({ redirect: true });
    login(email);
  }

  render() {
    const { email, password, redirect, disabled } = this.state;
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

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(login(e)),
});

export default connect(null, mapDispatchToProps)(Login);
