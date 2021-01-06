import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  validateInputs() {
    const { email, password } = this.state;
    const minimumLength = 6;
    const validEmail = /\S+@\S+\.\S+/;
    const validPassword = password.length >= minimumLength;
    return validEmail.test(email) && validPassword;
  }

  handleClick() {
    const { userLogin } = this.props;
    const { email } = this.state;
    userLogin(email);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Login
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite o seu e-mail"
              value={ email }
              onChange={ this.handleInput }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite a sua senha"
              value={ password }
              onChange={ this.handleInput }
              data-testid="password-input"
            />
          </label>
          <button
            type="button"
            disabled={ !this.validateInputs() }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userIsLogged: state.user.logged,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(login(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userIsLogged: PropTypes.bool.isRequired,
};
