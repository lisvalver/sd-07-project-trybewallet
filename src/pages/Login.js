import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

import { saveEmail } from '../actions';

// Construtor montanda a base do projeto do Alvaro, colega de grupo projeto 19
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  handleClick() {
    const { login } = this.props;
    const { email } = this.state;
    this.setState({ redirect: true });
    login(email);
  }

  checkInputs() {
    const { email, password } = this.state;
    const six = 6;
    const validEmail = email.match(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/));
    if (validEmail && password.length >= six) {
      return true;
    }
    return false;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const validInputs = this.checkInputs();
      this.setState({ disabled: !validInputs });
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

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  login: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
