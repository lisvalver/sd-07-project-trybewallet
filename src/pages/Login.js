import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      dataValidation: false,
    };

    this.validations = this.validations.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validations() {
    const { email, password } = this.state;
    const emailValidation = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
    const passwordMinLength = 6;
    const validEmail = email.match(emailValidation);
    const validPassword = password.length >= passwordMinLength;
    if (validEmail && validPassword) {
      this.setState({ dataValidation: true });
    } else {
      this.setState({ dataValidation: false });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.validations);
  }

  render() {
    const { email, password, dataValidation } = this.state;
    const { logon, logged } = this.props;

    if (logged) {
      return <Redirect to="/carteira" />;
    }

    return (
      <div>
        <h2>Login</h2>
        <form>
          <label htmlFor="email">
            Email
            <input
              data-testid="email-input"
              type="email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              value={ password }
              name="password"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ !dataValidation }
            onClick={ () => logon(email) }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  logon: (email) => dispatch(login(email)),
});

const mapStateToProps = (state) => ({
  logged: state.user.logged,
});

Login.propTypes = {
  logon: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
